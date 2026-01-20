/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Option } from './option.entity';
@Entity('user_responses')
export class UserResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User ID' })
  @Column()
  userId: string;

  @ApiProperty({ description: 'Question ID' })
  @Column()
  questionId: string;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @ApiProperty({
    description: 'Option ID (for single/multiple choice)',
    required: false,
  })
  @Column({ nullable: true })
  optionId?: string;

  @ManyToOne(() => Option, { nullable: true })
  @JoinColumn({ name: 'optionId' })
  selectedOption?: Option;

  @ApiProperty({
    description: 'Text answer (if open-ended question)',
    required: false,
  })
  @Column({ nullable: true })
  textAnswer?: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  updatedBy?: string;
}
