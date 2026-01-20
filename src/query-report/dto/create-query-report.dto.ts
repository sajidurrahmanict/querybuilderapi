/* eslint-disable prettier/prettier */
export class CreateQueryReportDto {
    name: string;
    description?: string;
    config: any;
    generatedSql: string;
    parameters?: any[];
}
