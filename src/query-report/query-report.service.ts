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
        let sql = report.generatedSql;

        // Basic parameter replacement logic if needed, 
        // but TypeORM's query method handles it more safely.
        // However, if the SQL contains something like :paramName, 
        // we should ensure it's passed correctly.

        // For simple parameter replacement, we can use the dataSource.query
        // which supports parameterized queries depending on the database driver.
        // TypeORM mysql driver uses '?' or field names.

        // If the frontend sends parameters that match :name in SQL, we can pass them.
        return await this.dataSource.query(sql, Object.values(params));
    }

    async regenerate(id: string): Promise<any[]> {
        const report = await this.findOne(id);
        // Regeneration in this context means re-executing the stored SQL
        // with the same or default parameters.
        return await this.dataSource.query(report.generatedSql);
    }

    async executeRaw(sql: string, params: any[]): Promise<any[]> {
        return await this.dataSource.query(sql, params);
    }
}
