/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

import { ItemDto } from './item.dto';
import { Field } from '../module.entity/field.entity';
import { SubItem } from '../module.entity/subitem.entity';
import { SubSubSubItem } from '../module.entity/subSubSubItem.entity';
import { SubSubItem } from '../module.entity/subsubitem.entity';

export class DataPointMapDto {
  id: string;
  DpGroup: Field;
  dataPoint: string;
  serialNumber: string;
  dataType: string;
  isRequired: boolean;
  isHide: boolean;
  userId:string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  Item?: ItemDto | null;
  viewEntry?: string|null;

}
export class AllDataPointDto {
  id: string;
  serialNumber: string;
  displayType: string;
  remarks: string;
  tier: string;
  fieldGroupCode: string;
  Item?: ItemDto | null;
  subItem?: SubItem | null;
  subSubItem?: SubSubItem | null;
  subSubSubItem?: SubSubSubItem | null;
  dataPoints?: DataPointMapDto[] | null;
  viewEntry?: string|null;
}
export class CreateDataPointMapDto {
  @ApiProperty({ description: 'Item ID associated with the data point' })
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @ApiProperty({ description: 'Group code for the data point' })
  @IsString()
  @IsNotEmpty()
  dpGroupId: string;

  @ApiProperty({ description: 'Data point for the data point' })
  @IsString()
  @IsNotEmpty()
  datapointid: string;

  @ApiProperty({ description: 'Serial number of the data point' })
  @IsNumber()
  serialNumber: number;
  
  @ApiProperty({ description: 'Type of data stored in the data point' })
  @IsString()
  dataType: string;

  @ApiProperty({ description: 'Whether the data point is hidden' })
  @IsBoolean()
  isHide: boolean;

  @ApiProperty({ description: 'Whether the data point is required' })
  @IsBoolean()
  isRequired: boolean;
  @ApiProperty({ description: 'ViewEntry of the field' })
  @IsString()
  viewEntry: string;

}
