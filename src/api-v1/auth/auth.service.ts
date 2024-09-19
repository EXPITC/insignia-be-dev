import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { User, UserRoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findByEmail(email);

    if (!!user && (await bcrypt.compare(password, user.password))) {
      const { password: _password, ...rest } = user;
      return rest;
    }

    throw new Error('email or password invalid');
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const user = await this.validateUser(email, password);
      if (!user?.emailVerified) {
        // check from third party or another if this user already verified,
        // if the user was new just click verification in his email and we update it when the user got login
        // for the first time or whenever email not verified
        // this also return forbid to login if condition check from third party null,
        //but cause i do have a lot of workload currently i just demo the core
      }
      const payload = { name: user.name, sub: user.Id };

      return this.jwtService.sign(payload);
    } catch (err) {
      console.error('Error signing JWT token:', err);
      throw new UnauthorizedException(err);
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 11);
  }

  async register(
    email: string,
    password: string,
    name: string,
    role: UserRoleEnum,
  ): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.createUser(
      email,
      hashedPassword,
      name,
      role,
    );
    if (!user) throw new Error('User registration failed');
    return user;
  }

  async verifyEmail(id: string) {
    try {
      const user = await this.usersService.findById(id);
      if (!user) throw new Error('User not found');
      const { password: _password, ...rest } = user;

      // send to email verification
      return {
        data: {
          user: rest,
          message: 'Verifycation Success being sent',
        },
      };
    } catch (err: any) {
      throw new UnauthorizedException('User registration failed', err.message);
    }
  }
}
