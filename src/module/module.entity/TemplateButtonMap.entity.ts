/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TemplateButtonMap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  itemId: string;

  @Column()
  dfGroupId: string;

  @Column()
  subitemId: string;

  @Column()
  subsubitemId: string;

  @Column()
  subsubsubitemId: string;

  @Column()
  serialNumber: string;
  
  @Column()
  buttonName: string;

  @Column()
  buttonAction: string;

  @Column()
  buttonType: string;

  @Column()
  navigationTo: string;

  @Column()
  userId: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  updatedBy?: string;
  name: any;
  description: any;
}
