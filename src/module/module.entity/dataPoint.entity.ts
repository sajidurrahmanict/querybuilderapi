/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity("DataPoint")
export class DataPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  itemId: string;

  @Column()
  dpGroupCode: string;

  @Column()
  dataPoint: string;

  @Column()
  serialNumber: string;

  @Column()
  dataType: string;
  @Column()
  userId: string;
  @Column({ default: false })
  isHide: boolean;

  @Column({ default: false })
  isRequired: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  regional?:string
}
