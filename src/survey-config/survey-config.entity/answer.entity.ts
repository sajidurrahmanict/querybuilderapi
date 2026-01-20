/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
// answer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Question } from './question.entity';
import { QuestionModel } from './question-model.entity';
//import { SubSubItemAnswer } from './subSubItemAnswer.entity';

@Entity("answers")
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "text", nullable: true })
  text: string | null; // ✅ Explicit type 'text' ensures compatibility with MySQL

  @Column("simple-array", { nullable: true })
  selectedOptionIds: string[] | null; // ✅ Allow null for unanswered optional questions

  @ManyToOne(() => Question, (q) => q.answers, { nullable: true, onDelete: 'CASCADE' })
  question: Question;

  @ManyToOne(() => QuestionModel, (qm) => qm.answers, { nullable: true, onDelete: 'CASCADE' })
  questionModel: QuestionModel;
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
  // @OneToMany(() => SubSubItemAnswer, (ssa) => ssa.answer)
  // subSubItemAnswers: SubSubItemAnswer[];
}

