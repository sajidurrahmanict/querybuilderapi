/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTemplateDto {
 @ApiProperty({
    description: 'The name of the template',
    example: 'Invoice Template',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A unique code to identify the template',
    example: 'INV-TEMP-001',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional({
    description: 'Optional description of the template',
    example: 'This template is used for monthly invoices',
  })
  @IsOptional()
  @IsString()
  description?: string;
}

