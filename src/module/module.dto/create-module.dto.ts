/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({ description: 'Name of the module' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tier of the module' })
  @IsString()
  tier: string;
  @ApiProperty({ description: 'SerialNumber of the module' })
  @IsString()
  serialNumber: string;
}
export class UpdateModuleDto {
  @IsString()
  @ApiProperty({ description: 'Name of the module' })
  name?: string;
  @ApiProperty({ description: 'Tier of the module' })
  @IsString()
  @IsOptional()
  tier: string;
  @ApiProperty({ description: 'SerialNumber of the module' })
  @IsString()
  serialNumber: string;
}
export class ModuleDto {
  id: string;
  name: string;
  serialNumber: string;
  tier?: string|null;
}
