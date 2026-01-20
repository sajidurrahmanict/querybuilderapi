/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
// src/middleware/jwt-auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity/user.entity';
import { Role } from '../user/user.entity/user.role';

// @Injectable()
// export class JwtAuthMiddleware implements NestMiddleware {
//   constructor(
//     private readonly jwtService: JwtService,
//     @InjectRepository(User) private readonly userRepo: Repository<User>,
//     @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
//   ) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('Missing or invalid Authorization header');
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//       const payload: any = this.jwtService.verify(token);

//       const user = await this.userRepo.findOneBy({ id: payload.sub });
//       if (!user) {
//         throw new UnauthorizedException('User not found');
//       }

//       const role = await this.roleRepo.findOneBy({ userId: user.id });

//       // Attach to request for access in routes
//       req['user'] = user;
//       req['role'] = role;

//       next();
//     } catch (err) {
//       throw new UnauthorizedException('Invalid or expired token');
//     }
//   }
// }
@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload: any = this.jwtService.verify(token);

      const user = await this.userRepo.findOneBy({ id: payload.sub });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const role = await this.roleRepo.findOneBy({ userId: user.id });

      req['user'] = user;
      req['role'] = role;

      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
