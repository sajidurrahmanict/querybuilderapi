/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto} from '../Template/dtos/template.dto';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post("addTemplate")
  create(@Body() dto: CreateTemplateDto) {
    console.log(dto);
    return this.templateService.create(dto);
  }

  @Get("getAllTemplates")
  findAll() {
    return this.templateService.findAll();
  }

  @Get('getTemplate:id')
  findOne(@Param('id') id: string) {
    return this.templateService.findOne(id);
  }

  @Put('updateTemplate:id')
  update(@Param('id') id: string, @Body() dto: CreateTemplateDto) {
    return this.templateService.update(id, dto);
  }

@Delete('deleteTemplate/:id')
remove(@Param('id') id: string): Promise<{ status: string; message: string }> {
  return this.templateService.remove(id);
}

}
