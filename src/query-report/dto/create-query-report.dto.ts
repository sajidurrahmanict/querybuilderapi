/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNotEmpty, IsArray, IsObject } from 'class-validator';

export class CreateQueryReportDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    code?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsObject()
    @IsNotEmpty()
    config: any;

    @IsString()
    @IsNotEmpty()
    generatedSql: string;

    @IsArray()
    @IsOptional()
    parameters?: any[];
}
