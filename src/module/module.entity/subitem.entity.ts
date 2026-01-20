/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

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
import { ButtonGroup, Item } from './item.entity';
import { Field } from './field.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SubSubItem } from './subsubitem.entity';

@Entity()
export class SubItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  tier: string;
  @Column()
  itemId?: string;
  @ManyToOne(() => Item, (item) => item.subItems, { nullable: true })
  item: Item;
  @OneToMany(() => SubSubItem, (subSubItem) => subSubItem.subItem)
  subSubItems: SubSubItem[];
  @Column({ nullable: true })
  templateId?: string;
  @Column()
  userId: string;
  @Column()
  serialNumber: string;
  @Column()
  @ApiProperty({description: 'P for Primary, S for Secondary' })
  buttonType: ButtonGroup;
  @Column()
  @ApiProperty({ description: 'Button label such as Export, Print, etc.' })
  buttonLabel: string
  @Column()
  layout: string;
  @Column({ nullable: true })
  templateText?: string;
  @Column()
  navigationTo: string;
  @Column()
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  updatedBy?: string;
  @Column({ nullable: true })
  viewEntry?: string;
}
