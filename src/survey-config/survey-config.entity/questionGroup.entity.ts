/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Question } from './question.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Survey } from './survey.entity';


@Entity('questionGroups')
export class QuestionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ManyToOne(() => Survey, survey => survey.questionGroups, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @OneToMany(() => Question, q => q.questionGroup, { cascade: true, eager: true })
  questions: Question[];
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
// }
// @Entity('question_groups')
// export class QuestionGroup {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   title: string;

//   @Column()
//   description: string;

//   @OneToMany(() => Question, question => question.questionGroup, { cascade: true, eager: true })
//   questions: Question[];
// }