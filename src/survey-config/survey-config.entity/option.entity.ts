/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { QuestionModel } from './question-model.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty()
  @Column()
  value: string;

  @ApiProperty({ description: 'Associated Question ID', required: false })
  @Column({ nullable: true })
  questionId?: string;

  @ManyToOne(() => Question, question => question.options, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questionId' })
  question?: Question;

  @ApiProperty({ description: 'Associated QuestionModel ID', required: false })
  @Column({ nullable: true })
  questionModelId?: string;

  @ManyToOne(() => QuestionModel, qm => qm.options, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questionModelId' })
  questionModel?: QuestionModel;
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
// option.entity.ts
// @Entity('options')
// export class Option {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   text: string;

//   @Column()
//   value: string;

//   @ManyToOne(() => Question, question => question.options, { nullable: true })
//   question: Question;

//   @ManyToOne(() => QuestionModel, model => model.options, { nullable: true })
//   questionModel: QuestionModel;
// }
