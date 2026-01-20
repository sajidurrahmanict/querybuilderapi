/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { SubItemDto } from './subiItem.dto';
import { Template } from 'src/Template/entity/template';
import { ButtonGroup } from '../module.entity/item.entity';

export class SubSubItemDto {
  id: string;
  name: string;
  tier?: string|null;
  serialNumber: string;
  layout: string;
  templateText?: string | null;
  buttonType: ButtonGroup;
  buttonLabel: string;
  navigationTo:string;
  subItemId?: string;
  subItem?: SubItemDto | null;
  template?: Template | null;
  viewEntry?: string|null;
}
export class CreateSubSubItemDto {
  @ApiProperty({ description: 'Label of the SubSubItem' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'Tier of the SubSubItem' })
  @IsString()
  @IsOptional()
  tier: string;
  @ApiProperty({ description: 'layout/Placement of the SubSubItem' })
  @IsString()
  layout: string;
  @ApiProperty({
    description: 'P for Primary, S for Secondary of the subSubItem',
  })
  @IsString()
  buttonType: ButtonGroup;
  @ApiProperty({ description: 'Button label such as Export, Print, etc.' })
  @IsString()
  buttonLabel: string;
   @ApiProperty({
    description: 'NavigationTo of the subSubItem',
  })
  @IsString()
  navigationTo: string;
  @ApiProperty({ description: 'SerialNumber of the SubSubItem' })
  @IsString()
  serialNumber: string;
  @ApiProperty({
    description: 'Template ID of the SubSubItem',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  templateId?: string | null;

  @ApiProperty({
    description: 'Template of text box of the SubSubItem',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  templateText?: string | null;
  @ApiPropertyOptional({ description: 'SubSubItem ID' })
  @IsString()
  @IsOptional()
  subItemId?: string;
  @ApiProperty({ description: 'ViewEntry of the field' })
  @IsString()
  viewEntry: string;
}
