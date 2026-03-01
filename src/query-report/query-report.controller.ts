import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryReportService } from './query-report.service';
import { CreateQueryReportDto } from './dto/create-query-report.dto';
import { ExecuteQueryDto } from './dto/execute-query.dto';

@ApiTags('query-reports')
@Controller()
export class QueryReportController {
    constructor(private readonly queryReportService: QueryReportService) { }

    @Post('execute-query')
    @ApiOperation({ summary: 'Execute a query from configuration or raw SQL' })
    async executeQuery(@Body() dto: ExecuteQueryDto) {
        return await this.queryReportService.executeQuery(dto);
    }

    @Post('save-as-template')
    @ApiOperation({ summary: 'Save a query configuration as a template' })
    async saveAsTemplate(@Body() dto: ExecuteQueryDto) {
        return await this.queryReportService.saveAsTemplate(dto);
    }

    @Post('query-reports')
    async create(@Body() dto: CreateQueryReportDto) {
        return await this.queryReportService.create(dto);
    }

    @Get('query-reports')
    async findAll() {
        return await this.queryReportService.findAll();
    }

    @Get('query-reports/:id')
    async findOne(@Param('id') id: string) {
        return await this.queryReportService.findOne(id);
    }

    @Delete('query-reports/:id')
    async remove(@Param('id') id: string) {
        return await this.queryReportService.remove(id);
    }

    @Post('query-reports/:id/execute')
    async execute(@Param('id') id: string, @Body() params: Record<string, any>) {
        return await this.queryReportService.execute(id, params);
    }

    @Post('query-reports/:id/regenerate')
    async regenerate(@Param('id') id: string) {
        return await this.queryReportService.regenerate(id);
    }

    @Post('query-reports/execute-raw')
    async executeRaw(@Body() body: { sql: string; params?: any[] }) {
        return await this.queryReportService.executeRaw(body.sql, body.params || []);
    }
}
