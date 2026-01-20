/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Menu } from './menu.entity';
import { SubItem } from './subitem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @ApiProperty({ description: 'Name of the item' })
  name: string;
  @Column()
  @ApiProperty({ description: 'Menu ID' })
  menuId: string;
  @ManyToOne(() => Menu, (menu) => menu.items)
  menu: Menu;
  @Column()
  serialNumber: string;
  @Column()
  @ApiProperty({description: 'P for Primary, S for Secondary' })
  buttonType: ButtonGroup;
  @Column()
  @ApiProperty({ description: 'Button label such as Export, Print, etc.' })
  buttonLabel: string
  @Column()
  navigationTo: string;
  @Column()
  description: string;
  @OneToMany(() => SubItem, (subItem) => subItem.item)
  subItems: SubItem[];
  @Column()
  userId: string;
  @Column({ nullable: true })
  itemType: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  updatedBy?: string;
}
export enum ButtonGroup {
  PRIMARY = 'P',
  SECONDARY = 'S',
}
