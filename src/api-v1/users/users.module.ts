import { Module } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PrismaService, UserService, AuthService, JwtService],
  controllers: [UsersController],
})
export class UserModule {}
