/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity("DataPointMap")
export class DataPointMap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  itemId: string;

  @Column()
  dpGroupId: string;

  @Column()
  dataPointId: string;

  @Column({ nullable: true })
  serialNumber: string;

  @Column({ nullable: true })
  dataType?: string;
  @Column()
  userId: string;
  @Column({ default: false })
  isHide: boolean;

  @Column({ default: false })
  isRequired: boolean;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  updatedBy?: string;
  
  @Column({ nullable: true })
  viewEntry?:string
}
