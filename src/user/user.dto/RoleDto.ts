/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    example: 'admin',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'UUID of the user to whom this role belongs',
    example: 'b6a6f360-98df-4c99-9e9f-8c3cb6211c12',
  })
  @IsUUID()
  userId: string;
}
