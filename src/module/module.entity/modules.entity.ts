/* eslint-disable prettier/prettier */
// module.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { App } from './app.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Modules {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @ApiProperty({ description: 'Name of the module' })
  name: string;
  @Column({ nullable: true })
  tier: string;
  @Column()
  serialNumber: string;
  @OneToMany(() => App, (app) => app.module)
  apps: App[];
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
