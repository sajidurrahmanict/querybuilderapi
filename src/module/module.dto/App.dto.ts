/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { ModuleDto } from './create-module.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AppDto {
  id: string;
  name: string;
  tier?: string|null;
  serialNumber: string;
  Module: ModuleDto | null;
}
export class CreateAppDto {
  @ApiProperty({ description: 'Name of the app' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ description: 'Tier of the App' })
  @IsString()
  @IsOptional()
  tier: string;
  @ApiProperty({ description: 'SerialNumber of the App' })
  @IsString()
  serialNumber: string;
  @ApiProperty({ description: 'Module ID' })
  @IsNotEmpty()
  @IsString()
  moduleId: string;
}
export class UpdateAppDto {
  @ApiProperty({ description: 'Name of the app' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ description: 'Tier of the App' })
  @IsString()
 @IsOptional()
  tier: string;
  @ApiProperty({ description: 'SerialNumber of the App' })
  @IsString()
  serialNumber: string;
  @ApiProperty({ description: 'Module ID' })
  @IsNotEmpty()
  @IsString()
  moduleId: string;
}
