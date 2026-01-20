/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the feature' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Name of the feature' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Additional remarks or notes about the feature' })
  remarks: string;
}
