/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

import { ItemDto } from './item.dto';
import { Field } from '../module.entity/field.entity';
import { SubItem } from '../module.entity/subitem.entity';
import { SubSubSubItem } from '../module.entity/subSubSubItem.entity';
import { SubSubItem } from '../module.entity/subsubitem.entity';

export class TemplateButtonMapDto {
  id: string;
  itemId: string;
  subitemId: string;
  subsubitemId: string;
  subsubsubitemId: string;
  dfGroupId: string;
  serialNumber: string;
  buttonName: string;
  buttonAction: string;
  buttonType: string;
  navigationTo: string;
  userId:string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  subItemId: any;
  subSubItemId: any;
  subSubSubItemId: any;
}

export class CreateTemplateButtonMapDto {
  @ApiProperty({ description: 'Item ID associated with the data point' })
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @ApiProperty({ description: 'dfGroupId' })
  @IsString()
  @IsNotEmpty()
  dfGroupId: string;

  @ApiProperty({ description: 'subitemId' })
  @IsString()
  subitemId: string;

  @ApiProperty({ description: 'subsubitemId' })
  @IsString()
  subsubitemId: string;

  @ApiProperty({ description: 'subsubsubitemId' })
  @IsString()
  subsubsubitemId: string;

  @ApiProperty({ description: 'Serial number of the data point' })
  @IsString()
  serialNumber: string;
  
  @ApiProperty({ description: 'buttonName' })
  @IsString()
  buttonName: string;

  @ApiProperty({ description: 'buttonAction ' })
  @IsString()
  buttonAction: string;

  @ApiProperty({ description: 'buttonType' })
  @IsString()
  buttonType: string;

  @ApiProperty({ description: 'navigationTo' })
  @IsString()
  navigationTo: string;

}
