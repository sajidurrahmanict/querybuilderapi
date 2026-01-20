/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional} from 'class-validator';
import { MenuDto } from './menu.dto';
import { ButtonGroup } from '../module.entity/item.entity';
export class ItemDto {
 
  id: string;
  name: string;
  itemType?:string|null;
  serialNumber:string;
  buttonType:ButtonGroup;
  buttonLabel:string;
  navigationTo:string;
  description:string;
  menu: MenuDto|null;
  viewEntry?: string|null;
}
export class CreateItemDto {
  @ApiProperty({ description: 'Name of the item' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'itemType of the Item' })
  @IsString()
  @IsOptional()
  itemType: string;

  @ApiProperty({ description: 'serialNumber of the SubItem' })
  @IsString()
  serialNumber: string;
  @ApiProperty({ description: 'P for Primary, S for Secondary of the Item' })
  @IsString()
  buttonType: ButtonGroup;
  @ApiProperty({ description: 'Button label such as Export, Print, etc.' })
  @IsString()
  buttonLabel:string;
  @ApiProperty({ description: 'navigationTo of the SubItem' })
  @IsString()
  navigationTo: string;
  @ApiProperty({ description: 'Description of the SubItem' })
  @IsString()
  description: string;
  @ApiProperty({ description: 'Menu ID' })
  @IsString()
  @IsNotEmpty()
  menuId: string;
  @ApiProperty({ description: 'ViewEntry of the field' })
  @IsString()
  viewEntry: string;
}