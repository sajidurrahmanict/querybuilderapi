/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QueryReportService } from './query-report.service';
import { CreateQueryReportDto } from './dto/create-query-report.dto';

@Controller('query-reports')
export class QueryReportController {
    constructor(private readonly queryReportService: QueryReportService) { }

    @Post()
    async create(@Body() dto: CreateQueryReportDto) {
        return await this.queryReportService.create(dto);
    }

    @Get()
    async findAll() {
        return await this.queryReportService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.queryReportService.findOne(id);
    }

    @Post(':id/execute')
    async execute(@Param('id') id: string, @Body() params: Record<string, any>) {
        return await this.queryReportService.execute(id, params);
    }

    @Post(':id/regenerate')
    async regenerate(@Param('id') id: string) {
        return await this.queryReportService.regenerate(id);
    }

    @Post('execute-raw')
    async executeRaw(@Body() body: { sql: string; params?: any[] }) {
        return await this.queryReportService.executeRaw(body.sql, body.params || []);
    }
}
