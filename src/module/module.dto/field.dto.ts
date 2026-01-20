/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { ItemDto } from './item.dto';

import { SubItem } from '../module.entity/subitem.entity';
import { SubSubItem } from '../module.entity/subsubitem.entity';
import { SubSubSubItem } from '../module.entity/subSubSubItem.entity';

export class FieldDto {
  id: string;
  serialNumber: string;
  displayType: string;
  remarks: string;
  tier:string;
  fieldGroupCode: string;
  Item?: ItemDto | null;
  subItem?: SubItem | null;
  subSubItem?: SubSubItem | null;
  subSubSubItem?: SubSubSubItem| null;
  viewEntry?: string|null;
}


export class CreateFieldDto {
  @ApiProperty({ description: 'Remarks of the field' })
  @IsString()
  @IsNotEmpty()
  remarks: string;
  @ApiProperty({ description: 'Serial Number of the field' })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;
  @ApiProperty({ description: 'Serial Number of the field' })
  @IsString()
  @IsNotEmpty()
  fieldGroupCode: string;
  @ApiProperty({ description: 'Field Group code Type of the field' })
  @IsString()
  @IsNotEmpty()
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
