/* eslint-disable prettier/prettier */
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDesignDefinitionDto {
  @ApiProperty({
    description: 'Content type ID as a string UUID',
    example: 'df82427e-4b99-4d6e-b839-8e5e99c2a9c2',
  })
  @IsString()
  @IsNotEmpty()
  contentTypeId: string;

  @ApiProperty({
    description: 'Content type name',
    example: 'Flowchart',
  })
  @IsString()
  @IsNotEmpty()
  contentTypeName: string;

  @ApiProperty({
    description: 'File type or format (e.g., svg, png, json)',
    example: 'json',
  })
  @IsString()
  @IsNotEmpty()
  fileType: string;

  @ApiProperty({
    description: 'Type of the design definition',
    enum: ['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'],
    example: 'CLASS',
  })
  @IsEnum(['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'])
  type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';

  @ApiProperty({
    description: 'Title of the design',
    example: 'Login Flow Design',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Design content in JSON format',
    type: Object,
  })
  @IsObject()
  @IsOptional()
  content: any;

  @ApiPropertyOptional({
    description: 'Public URL of the uploaded image or photo',
    example: 'https://cdn.example.com/uploads/design1.png',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Additional notes or comments for the design',
    example: 'Needs review from the frontend team',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class DesignDefinitionResponseDto {
  @ApiProperty({
    description: 'UUID of the design definition',
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Content type ID associated with the design',
    example: 'df82427e-4b99-4d6e-b839-8e5e99c2a9c2',
  })
  @IsString()
  contentTypeId: string;

  @ApiProperty({
    description: 'Content type name associated with the design',
    example: 'Flowchart',
  })
  @IsString()
  contentTypeName: string;

  @ApiProperty({
    description: 'File type or format of the design',
    example: 'json',
  })
  @IsString()
  fileType: string;

  @ApiProperty({
    description: 'Type of the design definition',
    enum: ['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'],
    example: 'CLASS',
  })
  @IsEnum(['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'])
  type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';

  @ApiProperty({
    description: 'Title of the design',
    example: 'Login Flow Design',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Design content in JSON format',
    example: { nodes: [], edges: [] },
    type: Object,
  })
  @IsOptional()
  content: any;

  @ApiPropertyOptional({
    description: 'Public URL of the uploaded image or photo',
    example: 'https://cdn.example.com/uploads/design1.png',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Additional notes or comments for the design',
    example: 'Needs review from the frontend team',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
