/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique username of the user',
    example: 'john_doe',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account (minimum 6 characters)',
    example: 'StrongP@ss123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
   @ApiProperty({
    description: 'Role name',
    example: 'admin',
  })
  @IsNotEmpty()
  userRole: string;
}
export class LoginUserDto {
  @ApiProperty({
    description: 'Unique username of the user'
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    description: 'Password for the user account (minimum 6 characters)'
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}