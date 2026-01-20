/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
//import { SubSubItem } from "src/survey-module/survey-module.entity/subsubitem.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
//import { Answer } from "./answer.entity";

@Entity()
export class SubSubItemAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => SubSubItem, (subSubItem) => subSubItem.subSubItemAnswers, { onDelete: 'CASCADE' })
  @Column()
  subSubItemId: string;

  //@ManyToOne(() => Answer, (answer) => answer.subSubItemAnswers, { onDelete: 'CASCADE' })
  @Column()
  answerId: string;

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

  // You can add extra metadata here if needed
  // @Column({ nullable: true })
  // status: string;
}
