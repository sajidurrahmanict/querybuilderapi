/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity()
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  serialNumber: string;
  @Column()
  fieldGroupCode: string;
  @Column()
  tier: string;
  @Column()
  itemId: string;
  @Column({ nullable: true })
  subItemId?: string;
  @Column({ nullable: true })
  subSubItemId?: string;
  @Column({ nullable: true })
  subSubSubItemId?: string;
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
  @Column()
  displayType: string;
  @Column()
  remarks: string;
  @Column()
  viewEntry: string;
}
