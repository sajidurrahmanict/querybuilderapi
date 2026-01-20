/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
//import { Modules } from "../survey-module.entity/modules.entity";

// menu.dto.ts

import { AppDto } from './App.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: 'Title of the menu' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'App ID' })
  @IsString()
  appId: string;
  @ApiProperty({ description: 'Tier of the Menu' })
  @IsString()
 @IsOptional()
  tier: string;
  @ApiProperty({ description: 'SerialNumber of the Menu' })
  @IsString()
  serialNumber: string;
}

export class MenuDto {
  id: string;
  title: string;
  tier?: string|null;
  serialNumber: string;
  app: AppDto | null;
}
