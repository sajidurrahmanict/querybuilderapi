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
export class Button {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @ApiProperty({ description: 'Name of the item' })
  name: string;
  @Column()
  serialNumber: string;
  @Column()
  @ApiProperty({description: 'buttonAction' })
  buttonAction: string;
  @Column()
  @ApiProperty({ description: 'description  such as Export, Print, etc.' })
  description: string
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
}
