/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubItem } from './subitem.entity';
import { ButtonGroup } from './item.entity';
//import { DesignDefinition } from 'src/design-definition/design-defination.entity/design-definition.entity';
//import { ApiProperty } from '@nestjs/swagger';
//import { SubSubItemAnswer } from 'src/survey-config/survey-config.entity/subSubItemAnswer.entity';

@Entity()
export class SubSubItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  subItemId?: string;
  @Column({ nullable: true })
  tier: string;
  @Column()
  layout: string;
  @Column()
  buttonType: ButtonGroup;
  @Column()
  buttonLabel: string
    @Column()
  navigationTo: string
  @Column()
  serialNumber: string;
  @ManyToOne(() => SubItem, (subItem) => subItem.subSubItems, {
    nullable: true,
  })
  subItem: SubItem;
  @Column({ nullable: true })
  templateId?: string;
   @Column({ nullable: true })
  templateText?: string;

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
  subSubSubItems: any;
  // ✅ One-to-Many relation with DesignDefinition
  // @OneToMany(() => DesignDefinition, (definition) => definition.subSubItem)
  // designDefinitions: DesignDefinition[];
  //@OneToMany(() => SubSubItemAnswer, (ssa) => ssa.subSubItem)
  //subSubItemAnswers: SubSubItemAnswer[];
  @Column({ nullable: true })
  viewEntry?: string;
}
