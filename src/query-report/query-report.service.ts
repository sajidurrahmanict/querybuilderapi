/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { QueryReport } from './query-report.entity';
import { CreateQueryReportDto } from './dto/create-query-report.dto';

@Injectable()
export class QueryReportService {
    constructor(
        @InjectRepository(QueryReport)
        private readonly queryReportRepository: Repository<QueryReport>,
        private readonly dataSource: DataSource,
    ) { }

    async create(dto: CreateQueryReportDto): Promise<QueryReport> {
        const report = this.queryReportRepository.create(dto);
        return await this.queryReportRepository.save(report);
    }

    async findAll(): Promise<QueryReport[]> {
        return await this.queryReportRepository.find();
    }

    async findOne(id: string): Promise<QueryReport> {
        const report = await this.queryReportRepository.findOne({ where: { id } });
        if (!report) {
            throw new NotFoundException(`Query report with ID ${id} not found`);
        }
        return report;
    }

    async execute(id: string, params: Record<string, any>): Promise<any[]> {
        const report = await this.findOne(id);
        let sqlToExecute = report.generatedSql;

        // If it's a builder query, we might want to rebuild it to get the freshest SQL
        if (report.config && !report.config.sql) {
            sqlToExecute = this.buildSQLFromConfig(report.config, params);
        } else {
            sqlToExecute = this.substituteParams(sqlToExecute, params);
        }

        return await this.dataSource.query(sqlToExecute);
    }

    async regenerate(id: string): Promise<any> {
        const report = await this.findOne(id);
        let sqlToExecute = report.generatedSql;

        if (report.config && !report.config.sql) {
            sqlToExecute = this.buildSQLFromConfig(report.config, {});
            report.generatedSql = sqlToExecute;
            await this.queryReportRepository.save(report);
        }

        return { generatedSql: sqlToExecute };
    }

    async executeRaw(sql: string, params: any[]): Promise<any[]> {
        return await this.dataSource.query(sql, params);
    }

    async executeQuery(body: any): Promise<any> {
        try {
            const { mode, sql: customSql, queryConfig, params, save, name, description, code } = body;
            let sqlToExecute: string;

            if (mode === 'custom') {
                if (!customSql) throw new Error('SQL query is required in custom mode');
                sqlToExecute = this.substituteParams(customSql, params || {});
            } else if (mode === 'builder') {
                if (!queryConfig) throw new Error('Query configuration is required in builder mode');
                sqlToExecute = this.buildSQLFromConfig(queryConfig, params || {});
            } else {
                throw new Error("Invalid mode. Use 'custom' or 'builder'");
            }

            let savedReport: QueryReport | null = null;
            if (save && name) {
                savedReport = await this.create({
                    name,
                    code,
                    description,
                    config: queryConfig || { sql: customSql },
                    generatedSql: sqlToExecute,
                    parameters: params ? [params] : []
                });
            }

            console.log('Executing SQL:', sqlToExecute);
            const data = await this.dataSource.query(sqlToExecute);
            return {
                data,
                params,
                generatedSql: sqlToExecute,
                reportId: savedReport?.id,
                report: savedReport
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error(`Query Execution Failed: ${error.message}`);
        }
    }

    async saveAsTemplate(body: any): Promise<any> {
        const { name, code, description, mode, queryConfig, sql, params } = body;

        if (!name) throw new Error('Name is required to save as template');

        // Execute to get the latest SQL and verify it works
        const result = await this.executeQuery({
            mode,
            queryConfig,
            sql,
            params,
            save: true,
            name,
            code,
            description
        });

        return {
            message: 'Template saved successfully',
            ...result
        };
    }

    private quote(identifier: string): string {
        return `"${identifier}"`;
    }

    private substituteParams(text: string, params: Record<string, string>): string {
        let result = text;
        for (const [key, value] of Object.entries(params)) {
            const escapedValue = String(value).replace(/'/g, "''");
            const regex = new RegExp(`:${key}\\b`, 'g');
            result = result.replace(regex, `'${escapedValue}'`);
        }
        return result;
    }

    private generateSubquerySQL(subquery: any, params: Record<string, string> = {}): string {
        if (subquery.sql && (!subquery.selectedTables || subquery.selectedTables.length === 0)) {
            return this.substituteParams(subquery.sql, params);
        }

        const selectedTables = subquery.selectedTables || [];
        const columns = subquery.columns || [];
        const joins = subquery.joins || [];
        const conditions = subquery.conditions || [];

        if (selectedTables.length === 0) return '';

        const selectCols = columns.length > 0
            ? columns
                .filter((c: any) => c.table && c.column)
                .map((c: any) => {
                    let col = `${this.quote(c.table)}.${this.quote(c.column)}`;
                    if (c.aggregate) col = `${c.aggregate}(${col})`;
                    if (c.alias) col += ` AS ${this.quote(c.alias)}`;
                    return col;
                })
                .join(', ')
            : '*';

        let baseTable = selectedTables[0];
        if (joins.length > 0 && joins[0].leftTable) {
            baseTable = joins[0].leftTable;
        }

        let sql = `SELECT ${selectCols}\nFROM ${this.quote(baseTable)}`;
        const addedTables = new Set([baseTable]);

        joins.forEach((join: any) => {
            if (join.leftTable && join.rightTable && join.leftColumn && join.rightColumn) {
                if (addedTables.has(join.leftTable) && !addedTables.has(join.rightTable)) {
                    sql += `\n${join.joinType} JOIN ${this.quote(join.rightTable)} ON ${this.quote(join.leftTable)}.${this.quote(join.leftColumn)} = ${this.quote(join.rightTable)}.${this.quote(join.rightColumn)}`;
                    addedTables.add(join.rightTable);
                }
            }
        });

        selectedTables.forEach((table: string) => {
            if (!addedTables.has(table)) {
                sql += `,\n${this.quote(table)}`;
                addedTables.add(table);
            }
        });

        if (conditions.length > 0) {
            const validConditions = conditions.filter((c: any) => c.table && (c.column || c.operator === 'EXISTS' || c.operator === 'NOT EXISTS'));
            if (validConditions.length > 0) {
                sql += '\nWHERE ';
                validConditions.forEach((condition: any, index: number) => {
                    if (index > 0) {
                        sql += ` ${condition.logicalOperator || 'AND'} `;
                    }

                    if (condition.operator === 'EXISTS' || condition.operator === 'NOT EXISTS') {
                        sql += `${condition.operator} (${this.substituteParams(condition.value, params)})`;
                        return;
                    }

                    const columnRef = `${this.quote(condition.table)}.${this.quote(condition.column)}`;
                    const substitutedValue = this.substituteParams(condition.value, params);

                    if (condition.operator === 'IS NULL' || condition.operator === 'IS NOT NULL') {
                        sql += `${columnRef} ${condition.operator}`;
                    } else if (condition.operator === 'IN' || condition.operator === 'NOT IN') {
                        sql += `${columnRef} ${condition.operator} (${substitutedValue})`;
                    } else if (condition.operator === 'LIKE') {
                        sql += `${columnRef} ${condition.operator} ${substitutedValue}`;
                    } else {
                        sql += `${columnRef} ${condition.operator} ${substitutedValue}`;
                    }
                });
            }
        }

        return sql;
    }

    private buildSQLFromConfig(config: any, params: Record<string, string>): string {
        const { selectedTables, joins, conditions, columns, groupByColumns, orderBy, subqueries, tableAliases } = config;

        if (selectedTables.length === 0 && subqueries.length === 0) {
            return 'SELECT * FROM ...';
        }

        let sql = '';

        const withSubqueries = subqueries.filter((sq: any) => sq.type === 'with');
        if (withSubqueries.length > 0) {
            sql += 'WITH ';
            sql += withSubqueries.map((sq: any) => {
                const subquerySql = this.generateSubquerySQL(sq, params);
                return `${this.quote(sq.alias)} AS (\n  ${subquerySql}\n)`;
            }).join(',\n');
            sql += '\n';
        }

        const selectCols = columns.length > 0
            ? columns
                .filter((c: any) => c.visible && c.table && c.column)
                .map((c: any) => {
                    const tableAlias = tableAliases[c.table] || c.table;
                    let col = `${this.quote(tableAlias)}.${this.quote(c.column)}`;
                    if (c.aggregate) {
                        col = `${c.aggregate}(${col})`;
                    }
                    if (c.alias) {
                        col += ` AS ${this.quote(c.alias)}`;
                    }
                    return col;
                })
                .join(', ')
            : '*';

        const inlineSubqueries = subqueries.filter((sq: any) => sq.type === 'inline');
        if (inlineSubqueries.length > 0 && selectedTables.length === 0) {
            const firstSubquery = inlineSubqueries[0];
            const subquerySql = this.generateSubquerySQL(firstSubquery, params);
            sql += `SELECT ${selectCols}\nFROM (\n  ${subquerySql}\n) AS ${this.quote(firstSubquery.alias)}`;
        } else if (selectedTables.length > 0) {
            let primaryTable = selectedTables[0];

            if (joins.length > 0) {
                const validJoins = joins.filter((j: any) => j.leftTable && j.rightTable && j.leftColumn && j.rightColumn);
                if (validJoins.length > 0) {
                    primaryTable = validJoins[0].leftTable;
                }
            }

            const primaryTableAlias = tableAliases[primaryTable];
            sql += `SELECT ${selectCols}\nFROM ${this.quote(primaryTable)}`;
            if (primaryTableAlias) {
                sql += ` AS ${this.quote(primaryTableAlias)}`;
            }

            const processedJoins = new Set<string>();
            joins.forEach((join: any) => {
                if (join.leftTable && join.rightTable && join.leftColumn && join.rightColumn) {
                    const joinKey = `${join.leftTable}.${join.leftColumn}-${join.rightTable}.${join.rightColumn}`;
                    if (processedJoins.has(joinKey)) {
                        return;
                    }
                    processedJoins.add(joinKey);

                    const leftAlias = tableAliases[join.leftTable] || join.leftTable;
                    const rightAlias = tableAliases[join.rightTable] || join.rightTable;

                    sql += `\n${join.joinType} JOIN ${this.quote(join.rightTable)}`;
                    if (tableAliases[join.rightTable]) {
                        sql += ` AS ${this.quote(rightAlias)}`;
                    }
                    sql += ` ON ${this.quote(leftAlias)}.${this.quote(join.leftColumn)} = ${this.quote(rightAlias)}.${this.quote(join.rightColumn)}`;
                }
            });
        }

        const joinSubqueries = subqueries.filter((sq: any) => sq.type === 'join');
        joinSubqueries.forEach((sq: any) => {
            const subquerySql = this.generateSubquerySQL(sq, params);
            const joinType = sq.joinType || 'LEFT';

            sql += `\n${joinType} JOIN (\n  ${subquerySql}\n) AS ${this.quote(sq.alias)}`;

            if (sq.joinLeftTable && sq.joinLeftColumn && sq.joinRightColumn) {
                const leftTableAlias = tableAliases[sq.joinLeftTable] || sq.joinLeftTable;
                sql += ` ON ${this.quote(leftTableAlias)}.${this.quote(sq.joinLeftColumn)} = ${this.quote(sq.alias)}.${this.quote(sq.joinRightColumn)}`;
            } else {
                sql += ` ON true`;
            }
        });

        if (conditions.length > 0) {
            const validConditions = conditions.filter((c: any) => c.table && (c.column || c.operator === 'EXISTS' || c.operator === 'NOT EXISTS'));
            if (validConditions.length > 0) {
                sql += '\nWHERE ';
                validConditions.forEach((condition: any, index: number) => {
                    if (index > 0) {
                        sql += ` ${condition.logicalOperator || 'AND'} `;
                    }

                    if (condition.operator === 'EXISTS' || condition.operator === 'NOT EXISTS') {
                        sql += `${condition.operator} (${this.substituteParams(condition.value, params)})`;
                        return;
                    }

                    const tableAlias = tableAliases[condition.table] || condition.table;
                    const columnRef = `${this.quote(tableAlias)}.${this.quote(condition.column)}`;
                    const substitutedValue = this.substituteParams(condition.value, params);

                    if (condition.operator === 'IS NULL' || condition.operator === 'IS NOT NULL') {
                        sql += `${columnRef} ${condition.operator}`;
                    } else if (condition.operator === 'IN' || condition.operator === 'NOT IN') {
                        sql += `${columnRef} ${condition.operator} (${substitutedValue})`;
                    } else if (condition.operator === 'LIKE') {
                        sql += `${columnRef} ${condition.operator} ${substitutedValue}`;
                    } else {
                        sql += `${columnRef} ${condition.operator} ${substitutedValue}`;
                    }
                });
            }
        }

        if (groupByColumns && groupByColumns.length > 0 && groupByColumns.some((col: string) => col)) {
            const validGroups = groupByColumns.filter((col: string) => col);
            if (validGroups.length > 0) {
                const groupCols = validGroups.map((col: string) => {
                    const parts = col.split('.');
                    if (parts.length === 2) {
                        const tableAlias = tableAliases[parts[0]] || parts[0];
                        return `${this.quote(tableAlias)}.${this.quote(parts[1])}`;
                    }
                    return col;
                });
                sql += `\nGROUP BY ${groupCols.join(', ')}`;
            }
        }

        if (orderBy && orderBy.length > 0) {
            const validOrders = orderBy.filter((o: any) => o.table && o.column);
            if (validOrders.length > 0) {
                const orderCols = validOrders.map((o: any) => {
                    const tableAlias = tableAliases[o.table] || o.table;
                    return `${this.quote(tableAlias)}.${this.quote(o.column)} ${o.direction}`;
                });
                sql += `\nORDER BY ${orderCols.join(', ')}`;
            }
        }

        return sql + ';';
    }
}
