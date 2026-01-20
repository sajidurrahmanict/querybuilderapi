/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

import { ItemDto } from './item.dto';
import { Field } from '../module.entity/field.entity';
import { SubItem } from '../module.entity/subitem.entity';
import { SubSubSubItem } from '../module.entity/subSubSubItem.entity';
import { SubSubItem } from '../module.entity/subsubitem.entity';

export class DPGroupMapDto {
  id: string;
  // serialNumber: string;
  itier?: string;
  displayType?: string;
  dpgroupid: string;
  Item: ItemDto;
  subItem?: SubItem | null;
  subSubItem?: SubSubItem | null;
  subSubSubItem?: SubSubSubItem| null;
  viewEntry?: string|null;
}
export class AllDataPointDto {
  id: string;
  serialNumber: string;
  displayType: string;
  remarks: string;
  tier: string;
  fieldGroupCode: string;
  Item?: ItemDto | null;
  subItem?: SubItem | null;
  subSubItem?: SubSubItem | null;
  subSubSubItem?: SubSubSubItem | null;
  viewEntry?: string|null;
}
export class CreateDPGroupMapDto {

   @ApiProperty({ description: 'Serial Number of the field' })
   @IsString()
   @IsNotEmpty()
   dpGroupId: string;

   @ApiProperty({ description: 'iTier' })
   @IsString()
   itier: string;
   
   @ApiProperty({ description: 'Field Group code Type of the field' })
   @IsString()
   displayType: string;

  @ApiProperty({ description: 'Tier of the field' })
   @IsString()
   @IsNotEmpty()
   tier: string;

   @ApiProperty({ description: 'Item ID' })
   @IsString()
   @IsNotEmpty()
   itemId: string;
 
   @ApiProperty({ description: 'Sub Item ID', required: false })
   @IsString()
   @IsOptional()
   subItemId?: string;
 
   @ApiProperty({ description: 'Sub Sub Item ID', required: false })
   @IsString()
   @IsOptional()
   subSubItemId?: string;
 
   @ApiProperty({ description: 'Sub Sub Sub Item ID', required: false })
   @IsString()
   @IsOptional()
   subSubSubItemId?: string;
  @ApiProperty({ description: 'ViewEntry of the field' })
  @IsString()
  viewEntry: string;
}
