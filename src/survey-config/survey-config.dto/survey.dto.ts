/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
// === survey.dto.ts ===
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateQuestionGroupDto } from './create-question-group.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// export class CreateSurveyDto {
//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @IsString()
//   @IsOptional()
//   description?: string;

//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateQuestionGroupDto)
//   questionGroups: CreateQuestionGroupDto[];
// }

export class UpdateSurveyDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
export class CreateSurveyDto {
  @ApiProperty({ description: 'Title of the survey', example: 'Customer Feedback Survey' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Description of the survey', example: 'Survey to understand customer satisfaction' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'List of question groups within the survey', type: [CreateQuestionGroupDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionGroupDto)
  questionGroups: CreateQuestionGroupDto[];
}
