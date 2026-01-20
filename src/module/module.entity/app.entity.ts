/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
// app.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Modules } from './modules.entity';
import { Menu } from './menu.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @ApiProperty({ description: 'Name of the app' })
  name: string;
  @Column({ nullable: true })
  tier: string;
  @Column()
  serialNumber: string;
  @Column()
  @ApiProperty({ description: 'Module ID' })
  moduleId: string;
  @ManyToOne(() => Modules, (module) => module.apps)
  module: Modules;
  @OneToMany(() => Menu, (menu) => menu.app)
  menus: Menu[];
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
