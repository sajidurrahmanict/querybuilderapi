/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity/user.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './user.dto/UserDto';
import { Role } from './user.entity/user.role';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAllUsers')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

@Post('login')
@ApiBody({ type: LoginUserDto })
@ApiResponse({
  status: 200,
  description: 'User successfully logged in',
  schema: {
    example: {
      user: {
      },
      role: {
      },
      token: 'jwt_token_here',
    },
  },
})
async login(@Body() loginDto: LoginUserDto): Promise<any> {
  return this.userService.login(loginDto);
}


 @Post('addUser')
@ApiResponse({ status: 201, description: 'User and Role created successfully' })
async create(@Body() dto: CreateUserDto): Promise<{ user: User; role: Role }> {
  return this.userService.create(dto);
}


  @Delete('deleteUser:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }
}
