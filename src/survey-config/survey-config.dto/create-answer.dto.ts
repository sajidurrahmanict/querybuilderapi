/* eslint-disable prettier/prettier */
import {  ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAnswerDto {

  @ApiPropertyOptional({ description: 'Optional text response' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ description: 'Selected option IDs (comma-separated UUIDs)', type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  selectedOptionIds?: string[];

  @ApiPropertyOptional({ description: 'ID of the main question being answered' })
  @IsOptional()
  @IsUUID()
  questionId?: string;

  @ApiPropertyOptional({ description: 'ID of the sub-question (question model) being answered' })
  @IsOptional()
  @IsUUID()
  questionModelId?: string;
}
export class UpdateAnswerDto {


  @ApiPropertyOptional({ description: 'Optional text response' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ description: 'Selected option IDs (array of UUIDs)', type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  selectedOptionIds?: string[];

  @ApiPropertyOptional({ description: 'ID of the main question being answered' })
  @IsOptional()
  @IsUUID()
  questionId?: string;

  @ApiPropertyOptional({ description: 'ID of the sub-question (question model) being answered' })
  @IsOptional()
  @IsUUID()
  questionModelId?: string;
}
