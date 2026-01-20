/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional} from 'class-validator';
export class ButtonDto {
 
  id: string;
  name: string;
  serialNumber:string;
  buttonAction:string;
  description:string;
}
export class CreateButtonDto {
  @ApiProperty({ description: 'Name of the Button' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'description of the button' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'serialNumber of the SubItem' })
  @IsString()
  serialNumber: string;

  @ApiProperty({ description: 'P for Primary, S for Secondary of the Item' })
  @IsString()
  buttonAction: string;
  }