/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Option } from './option.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Answer } from './answer.entity';

@Entity('question-models')
export class QuestionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Text of the sub-question or question model' })
  @Column()
  text: string;

  @ApiProperty({ description: 'Type of the sub-question', enum: ['single', 'multiple'] })
  @Column()
  type: 'single' | 'multiple';

  @ApiProperty({ description: 'Whether the sub-question is required', default: false })
  @Column({ default: false })
  required: boolean;

  @ManyToOne(() => Question, question => question.questionModels, { nullable: false })
  @JoinColumn({ name: 'parentQuestionId' })
  parentQuestion: Question;

  @OneToMany(() => Option, option => option.questionModel, { cascade: true, eager: true })
  options: Option[];
   // NEW
  @OneToMany(() => Answer, answer => answer.question, { cascade: true })
  answers: Answer[];
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

// question-model.entity.ts
// @Entity('question_models')
// export class QuestionModel {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   text: string;

//   @Column()
//   type: 'single' | 'multiple';

//   @Column({ default: false })
//   required: boolean;

//   @ManyToOne(() => Question, question => question.questionModels)
//   parentQuestion: Question;

//   @OneToMany(() => Option, option => option.questionModel, { cascade: true, eager: true })
//   options: Option[];
// }