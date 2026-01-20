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
import { QuestionGroup } from './questionGroup.entity';
import { Option } from './option.entity';
import { QuestionModel } from './question-model.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Answer } from './answer.entity';


@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty()
  @Column({ nullable: true })
  answer?: string;

  @ApiProperty({ enum: ['single', 'multiple'] })
  @Column()
  type: 'single' | 'multiple';

  @ApiProperty()
  @Column({ default: false })
  required: boolean;

  @ManyToOne(() => QuestionGroup, qg => qg.questions, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'questionGroupId' }) // <-- crucial to explicitly define FK name
  questionGroup: QuestionGroup;

  @OneToMany(() => Option, o => o.question, { cascade: true, eager: true })
  options: Option[];

  @OneToMany(() => QuestionModel, qm => qm.parentQuestion, { cascade: true, eager: true })
  questionModels: QuestionModel[];
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

// question.entity.ts
// @Entity('questions')
// export class Question {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   text: string;

//   @Column()
//   type: 'single' | 'multiple';

//   @Column({ default: false })
//   required: boolean;
//   @Column()
//   answer: string;
//   @ManyToOne(() => QuestionGroup, group => group.questions)
//   questionGroup: QuestionGroup;

//   @OneToMany(() => Option, option => option.question, { cascade: true, eager: true })
//   options: Option[];

//   @OneToMany(() => QuestionModel, model => model.parentQuestion, { cascade: true, eager: true })
//   questionModels: QuestionModel[];
// }