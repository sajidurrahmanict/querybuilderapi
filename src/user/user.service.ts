/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
 
 

/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { CreateUserDto, LoginUserDto } from './user.dto/UserDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // or 'bcryptjs'
import { Role } from './user.entity/user.role';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
     private readonly jwtService: JwtService // inject JWT service
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

 async login(loginDto: LoginUserDto): Promise<any> {
  let user = await this.userRepository.findOneBy({ username: loginDto.username });
  console.log(user);
  if(!user){
    user=await this.userRepository.findOneBy({ email: loginDto.username });
  }
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const passwordValid = await bcrypt.compare(loginDto.password, user.password);

  if (!passwordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

    const role = await this.roleRepository.findOneBy({ userId: user.id });

    const payload = {
      sub: user.id,
      username: user.username,
      email:user.email,
      role: role?.name || 'user',
    };

    const token: string = this.jwtService.sign(payload); // 🟢 TOKEN AS STRING

  return {
    user:user,
    role:role,
    token:token,
  };
}

 async create(dto: CreateUserDto): Promise<{ user: User; role: Role }> {
  // Hash the password
  const hashedPassword = await bcrypt.hash(dto.password, 10);

  // Create the user
  const user = this.userRepository.create({
    username: dto.username,
    email: dto.email,
    password: hashedPassword,
  });

  const savedUser = await this.userRepository.save(user);

  // Create the role
  const role = this.roleRepository.create({
    name: dto.userRole,
    userId: savedUser.id,
  });

  const savedRole = await this.roleRepository.save(role);

  return { user: savedUser, role: savedRole };
}

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
