/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

// create-option.dto.ts
// export class CreateOptionDto {
//   @IsString()
//   @IsNotEmpty()
//   text: string;

//   @IsString()
//   @IsNotEmpty()
//   value: string;
// }
export class CreateOptionDto {
  @ApiProperty({ description: 'Display text of the option', example: 'Very satisfied' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: 'Value submitted for the option', example: 'very_satisfied' })
  @IsString()
  @IsNotEmpty()
  value: string;
}