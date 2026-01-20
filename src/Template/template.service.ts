/* eslint-disable prettier/prettier */
 
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from '../Template/entity/template';
import { CreateTemplateDto } from '../Template/dtos/template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private templateRepo: Repository<Template>,
  ) {}

  async create(dto: CreateTemplateDto): Promise<Template> {
    console.log(dto);
    const temp=new Template();
    temp.code=dto.code;
    temp.description=dto.description||null;
    temp.name=dto.name;
    temp.createdAt=new Date();
    temp.updatedAt=new Date();
    console.log(temp);
    const template = this.templateRepo.create(temp);
    console.log(template);
    return this.templateRepo.save(template);
  }

  async findAll(): Promise<Template[]> {
    return this.templateRepo.find();
  }

  async findOne(id: string): Promise<Template> {
    const template = await this.templateRepo.findOne({ where: { id } });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async update(id: string, dto: CreateTemplateDto): Promise<Template> {
  const template = await this.templateRepo.findOne({ where: { id } });
  if (!template) {
    throw new NotFoundException(`Template with id ${id} not found`);
  }

  template.name = dto.name;
  template.code = dto.code;
  template.description = dto.description || null;

  return await this.templateRepo.save(template);
}


 async remove(id: string): Promise<{ status: string; message: string }> {
  try {
    const template = await this.templateRepo.findOne({ where: { id } });
    if (!template) {
      return { status: 'error', message: 'Template not found.' };
    }

    await this.templateRepo.remove(template);
    return { status: 'success', message: 'Template deleted successfully.' };
  } catch (error) {
    console.error('Template deletion failed:', error);
    return { status: 'error', message: 'Failed to delete template.' };
  }
}

}
