/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryReport } from './query-report.entity';
import { QueryReportService } from './query-report.service';
import { QueryReportController } from './query-report.controller';

@Module({
    imports: [TypeOrmModule.forFeature([QueryReport])],
    providers: [QueryReportService],
    controllers: [QueryReportController],
    exports: [QueryReportService],
})
export class QueryReportModule { }
