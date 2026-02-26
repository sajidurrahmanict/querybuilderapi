import { IsString, IsOptional, IsNotEmpty, IsEnum, IsObject, IsBoolean } from 'class-validator';

export enum QueryMode {
    CUSTOM = 'custom',
    BUILDER = 'builder',
}

export class ExecuteQueryDto {
    @IsEnum(QueryMode)
    mode: QueryMode;

    @IsString()
    @IsOptional()
    sql?: string;

    @IsObject()
    @IsOptional()
    queryConfig?: any;

    @IsObject()
    @IsOptional()
    params?: Record<string, any>;

    @IsBoolean()
    @IsOptional()
    save?: boolean;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    code?: string;
}
