/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('DesignDefinitions')
export class DesignDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Correct type for MySQL
  contentTypeId: string;

  @Column()
  contentTypeName: string;

  @Column()
  fileType: string;

  @Column({
    type: 'enum',
    enum: ['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'],
  })
  type: 'CLASS' | 'ACTION' | 'ACTIVITY_DIAGRAM' | 'CLASS_DIAGRAM';

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'json',nullable:true }) // MySQL supports JSON
  content: any;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  notes?: string;

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
