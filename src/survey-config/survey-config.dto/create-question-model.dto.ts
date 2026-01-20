/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsArray, ValidateNested } from "class-validator";
import { CreateOptionDto } from "./create-option.dto";
import { ApiProperty } from "@nestjs/swagger";

// create-question-model.dto.ts
// export class CreateQuestionModelDto {
//   @IsString()
//   @IsNotEmpty()
//   text: string;

//   @IsEnum(['single', 'multiple'])
//   type: 'single' | 'multiple';

//   @IsBoolean()
//   required: boolean;

//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateOptionDto)
//   options: CreateOptionDto[];
// }
export class CreateQuestionModelDto {
  @ApiProperty({ description: 'Text of the sub-question', example: 'Rate the analytics feature' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: 'Type of the sub-question', enum: ['single', 'multiple'], example: 'single' })
  @IsEnum(['single', 'multiple'])
  type: 'single' | 'multiple';

  @ApiProperty({ description: 'Whether the sub-question is required', example: true })
  @IsBoolean()
  required: boolean;

  @ApiProperty({ description: 'Options for the sub-question', type: [CreateOptionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];
}
