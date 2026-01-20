/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

import { ItemDto } from './item.dto';
import { Field } from '../module.entity/field.entity';
import { SubItem } from '../module.entity/subitem.entity';
import { SubSubSubItem } from '../module.entity/subSubSubItem.entity';
import { SubSubItem } from '../module.entity/subsubitem.entity';

export class DataPointDto {
  id: string;
  DpGroup: Field;
  dataPoint: string;
  serialNumber: string;
  dataType: string;
  isRequired: boolean;
  isHide: boolean;
  regional?:string
  userId:string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  Item?: ItemDto | null;
}
export class AllDataPointDto {
  id: string;
  serialNumber: string;
  displayType: string;
  remarks: string;
  regional?:string
  tier: string;
  fieldGroupCode: string;
  Item?: ItemDto | null;
  subItem?: SubItem | null;
  subSubItem?: SubSubItem | null;
  subSubSubItem?: SubSubSubItem | null;
  dataPoints?: DataPointDto[] | null;
}
export class CreateDataPointDto {
  @ApiProperty({ description: 'Item ID associated with the data point' })
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @ApiProperty({ description: 'Group code for the data point' })
  @IsString()
  @IsNotEmpty()
  dpGroupCode: string;

  @ApiProperty({ description: 'Actual name of the data point' })
  @IsString()
  @IsNotEmpty()
  dataPoint: string;

  @ApiProperty({ description: 'Serial number of the data point' })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({ description: 'Type of data stored in the data point' })
  @IsString()
  @IsNotEmpty()
  dataType: string;

  @ApiProperty({ description: 'Whether the data point is hidden' })
  @IsBoolean()
  isHide: boolean;

  @ApiProperty({ description: 'Whether the data point is required' })
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty({ description: 'Regional' })
  @IsString()
  regional:string
}
