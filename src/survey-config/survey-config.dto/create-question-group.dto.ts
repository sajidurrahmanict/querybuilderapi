/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { CreateQuestionDto } from "./create-question.dto";
import { ApiProperty } from "@nestjs/swagger";

// create-question-group.dto.ts

// export class CreateQuestionGroupDto {
//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @IsString()
//   @IsNotEmpty()
//   description: string;

//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateQuestionDto)
//   questions: CreateQuestionDto[];
// }
export class CreateQuestionGroupDto {
  @ApiProperty({ description: 'Title of the question group', example: 'General Questions' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the question group', example: 'Basic questions for customers' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'List of questions in the group', type: [CreateQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
