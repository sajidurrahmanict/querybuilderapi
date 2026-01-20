/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubSubItem } from 'src/module/module.entity/subsubitem.entity';
import { Repository } from 'typeorm';
import { DesignDefinition } from './design-defination.entity/design-definition.entity';
import { CreateDesignDefinitionDto, DesignDefinitionResponseDto } from './design-definition.dto/design.dto';
//import { Field } from 'multer';
import { App } from 'src/module/module.entity/app.entity';
import { Field } from 'src/module/module.entity/field.entity';
import { Item } from 'src/module/module.entity/item.entity';
import { Menu } from 'src/module/module.entity/menu.entity';
import { Modules } from 'src/module/module.entity/modules.entity';
import { SubItem } from 'src/module/module.entity/subitem.entity';
import { User } from 'src/user/user.entity/user.entity';
import { Role } from 'src/user/user.entity/user.role';
//import { App } from 'supertest/types';

@Injectable()
export class DesignDefinitionService {
 constructor(
    @InjectRepository(DesignDefinition)
    private readonly designDefRepo: Repository<DesignDefinition>,
   @InjectRepository(Modules) private readonly modulesRepository: Repository<Modules>,
    @InjectRepository(App) private readonly appRepository: Repository<App>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(SubItem) private readonly subItemRepository: Repository<SubItem>,
    @InjectRepository(Field) private readonly fieldRepository: Repository<Field>,
    @InjectRepository(SubSubItem) private readonly subSubItemRepository: Repository<SubSubItem>,
  ) {} 
async findByContentTypeIdAndName(
  contentTypeId: string,
  contentTypeName: string,
): Promise<{ source: string; data: any }> {
  const sources: { repo: Repository<any>; name: string }[] = [
    { repo: this.modulesRepository, name: 'Modules' },
    { repo: this.appRepository, name: 'App' },
    { repo: this.menuRepository, name: 'Menu' },
    { repo: this.itemRepository, name: 'Item' },
    { repo: this.subItemRepository, name: 'SubItem' },
    { repo: this.fieldRepository, name: 'Field' },
    { repo: this.subSubItemRepository, name: 'SubSubItem' },
  ];

  for (const source of sources) {
    const match = await source.repo.findOne({
      where: {
        id: contentTypeId,
        name: contentTypeName,
      },
    });

    if (match) {
      return { source: source.name, data: match };
    }
  }

  throw new NotFoundException(
    `No entity found with id = ${contentTypeId} and name = ${contentTypeName}`,
  );
}


// async create(dto: CreateDesignDefinitionDto): Promise<DesignDefinition> {
//   // Ensure the content type is valid
//  const data= await this.findByContentTypeIdAndName(dto.contentTypeId, dto.contentTypeName);
// if(!data){
//   throw new NotFoundException(`DesignDefinition with ContentTypeId ${dto.contentTypeId} not found`);
// }
// const userId="adsahdasd";
//   const now = new Date();
//   const designDefinition = this.designDefRepo.create({
//     type: dto.type,
//     title: dto.title,
//     content: dto.content,
//     imageUrl: dto.imageUrl,
//     notes: dto.notes,
//     contentTypeId: dto.contentTypeId,
//     contentTypeName: dto.contentTypeName,
//     fileType: dto.fileType,
//     userId: userId,
//     createdBy: userId,
//     updatedBy: userId,
//     createdAt: now,
//     updatedAt: now,
//   });

//   return await this.designDefRepo.save(designDefinition);
// }
async create(
  dto: CreateDesignDefinitionDto,
  user: User
): Promise<DesignDefinition> {
  const now = new Date();

  const designDefinition = this.designDefRepo.create({
    type: dto.type,
    title: dto.title,
    content: dto.content,
    imageUrl: dto.imageUrl,
    notes: dto.notes,
    contentTypeId: dto.contentTypeId,
    contentTypeName: dto.contentTypeName,
    fileType: dto.fileType,
    userId: user.id,
    createdBy: user.username,
    updatedBy: user.username,
    createdAt: now,
    updatedAt: now,
  });

  return await this.designDefRepo.save(designDefinition);
}


async findAll(): Promise<DesignDefinition[]> {
  return await this.designDefRepo.find();

  // return data.map((designDef) => ({
  //   id: designDef.id,
  //   title: designDef.title,
  //   type: designDef.type,
  //   content: designDef.content,
  //   imageUrl: designDef.imageUrl,
  //   notes: designDef.notes,
  //   contentTypeId: designDef.contentTypeId,
  //   contentTypeName: designDef.contentTypeName,
  //   fileType: designDef.fileType,
  // }));
}

async findOne(id: string): Promise<DesignDefinition> {
  const designDef = await this.designDefRepo.findOne({
    where: { id }
  });

  if (!designDef) {
    throw new NotFoundException(`DesignDefinition with ID ${id} not found`);
  }
return designDef;
  // return {
  //   id: designDef.id,
  //   title: designDef.title,
  //   type: designDef.type,
  //   content: designDef.content,
  //   imageUrl: designDef.imageUrl,
  //   notes: designDef.notes,
  //   contentTypeId: designDef.contentTypeId,
  //   contentTypeName: designDef.contentTypeName,
  //   fileType: designDef.fileType,
  // };
}

async update(id: string, 
  dto: CreateDesignDefinitionDto,
  user: User): Promise<DesignDefinition> {
  const designDef = await this.designDefRepo.findOne({ where: { id } });

  if (!designDef) {
    throw new NotFoundException('DesignDefinition not found');
  }

  const now = new Date();

  Object.assign(designDef, {
    type: dto.type,
    title: dto.title,
    content: dto.content,
    imageUrl: dto.imageUrl,
    notes: dto.notes,
    contentTypeId: dto.contentTypeId,
    contentTypeName: dto.contentTypeName,
    fileType: dto.fileType,
    updatedBy: user.username,
    updatedAt: now,
  });

  return await this.designDefRepo.save(designDef);
}



  async remove(id: string): Promise<void> {
    const designDef = await this.designDefRepo.findOne({
      where: { id }
    });
    if(designDef){
    await this.designDefRepo.remove(designDef);
    }
  }


}
