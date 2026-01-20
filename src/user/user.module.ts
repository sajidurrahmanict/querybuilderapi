/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Role } from './user.entity/user.role';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([User,Role]),AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
