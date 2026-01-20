/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity("dpgroupmap")
export class DPGroupMap{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  itemId: string;
  @Column({ nullable: true })
  subItemId?: string;
  @Column({ nullable: true })
  subSubItemId?: string;
  @Column({ nullable: true })
  subSubSubItemId?: string;
  @Column()
  dpGroupId: string;

  @Column()
  itier: string;
  @Column({ nullable: true })
  serialNumber: string;
  @Column({ nullable: true })
  displayType?: string;
  @Column()
  userId: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  updatedBy?: string;
}
