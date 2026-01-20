/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubSubItemDto } from './subSubItem.dto';
import { Template } from 'src/Template/entity/template';

export class CreateSubSubSubItemDto {
  @ApiProperty({
    description: 'Name of the SubSubSubItem',
    example: 'Line Item 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Tier of the SubSubSubItem', example: 'Level 4' })
  @IsString()
  @IsOptional()
  tier: string;
  @ApiProperty({ description: 'layout/Placement of the SubItem' })
  @IsString()
  layout: string;
  @ApiProperty({ description: 'SerialNumber of the SubSubSubItem' })
  @IsString()
  serialNumber: string;
  @ApiProperty({
    description: 'Template ID of the SubSubSubItem',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  templateId?: string | null;

  @ApiProperty({
    description: 'Template of text box of the SubSubSubItem',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  templateText?: string | null;

  @ApiPropertyOptional({
    description: 'ID of the parent SubSubItem',
    example: 'uuid-subsubitem-789',
  })
  @IsOptional()
  @IsString()
  subSubItemId?: string;
  @ApiProperty({ description: 'ViewEntry of the field' })
  @IsString()
  viewEntry: string;
}
export class SubSubSubItemDto {
  id: string;
  name: string;
  tier?: string | null;
  templateText?: string | null;
  userId: string;
  subSubItemId?: string;
  subSubItem?: SubSubItemDto | null;
  serialNumber: string;
  layout: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  template?: Template | null;
  viewEntry?: string|null;
}
