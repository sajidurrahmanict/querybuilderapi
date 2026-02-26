import { Controller, Get } from '@nestjs/common';
import { DataSourceService } from './data-source.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Data Sources')
@Controller('data-sources')
export class DataSourceController {
    constructor(private readonly dataSourceService: DataSourceService) { }

    @Get('normalized')
    @ApiOperation({ summary: 'Get normalized data sources' })
    @ApiResponse({ status: 200, description: 'Return normalized apps, groups, data sources, columns, and relations.' })
    getNormalized() {
        return this.dataSourceService.getNormalizedData();
    }
}
