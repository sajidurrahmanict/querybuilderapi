/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional, IsArray, ValidateNested } from "class-validator";
import { CreateOptionDto } from "./create-option.dto";
import { CreateQuestionModelDto } from "./create-question-model.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column } from "typeorm";

// create-question.dto.ts
// export class CreateQuestionDto {
//   @IsString()
//   @IsNotEmpty()
//   text: string;

//   @IsEnum(['single', 'multiple'])
//   type: 'single' | 'multiple';

//   @IsBoolean()
//   required: boolean;

//   @IsOptional()
//   @IsString()
//   answer?: string;

//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateOptionDto)
//   options: CreateOptionDto[];

//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateQuestionModelDto)
//   questionModels?: CreateQuestionModelDto[];
// }
export class CreateQuestionDto {
  @ApiProperty({ description: 'Text of the question', example: 'How satisfied are you with our service?' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: 'Type of the question', enum: ['single', 'multiple'], example: 'single' })
  @IsEnum(['single', 'multiple'])
  type: 'single' | 'multiple';

  @ApiProperty({ description: 'Whether the question is required', example: true })
  @IsBoolean()
  required: boolean;

  @ApiProperty({ description: 'Pre-filled answer, if any', example: 'Very satisfied' })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  answer?: string;

  @ApiProperty({ description: 'Options available for the question', type: [CreateOptionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];

  @ApiPropertyOptional({ description: 'Follow-up sub-questions based on this question', type: [CreateQuestionModelDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionModelDto)
  questionModels?: CreateQuestionModelDto[];
}