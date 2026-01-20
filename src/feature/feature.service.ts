/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './feature.entity/feature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeatureService {
    
      constructor(
        @InjectRepository(Feature)
        private repository: Repository<Feature>,
      ) {}
    
      findAll(): Promise<Feature[]> {
        return this.repository.find();
      }
    
      async findOne(id: number): Promise<Feature> {
        const user = await this.repository.findOneBy({ id });
        if (!user) {
          throw new Error(`User with id ${id} not found`);
        }
        return user;
      }
    
      create(user: Partial<Feature>): Promise<Feature> {
        return this.repository.save(user);
      }
    
      async remove(id: number): Promise<void> {
        await this.repository.delete(id);
      }
}
