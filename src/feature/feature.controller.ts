/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { Feature } from './feature.entity/feature.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('features')
@Controller('feature')
export class FeatureController {
  constructor(private readonly service: FeatureService) {}

  @Get()
  findAll(): Promise<Feature[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Feature> {
    return this.service.findOne(+id);
  }

  @Post()
  @ApiBody({ type: Feature })
  @ApiResponse({ status: 201, description: 'Feature created', type: Feature })
  create(@Body() feature: Partial<Feature>): Promise<Feature> {
    return this.service.create(feature);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}

