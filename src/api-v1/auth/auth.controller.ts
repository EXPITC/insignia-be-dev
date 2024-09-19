import { Post, Body, BadRequestException } from '@nestjs/common';
import { ApiV1Controller } from '../prefix.decorator';
import { loginSchema, registerSchema } from './schema/auth.schema';
import { AuthService } from './auth.service';
import { z } from 'zod';

@ApiV1Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    try {
      const { email, password } = loginSchema.parse(body);
      const token = await this.authService.login(email, password);
      return { access_token: token };
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        throw new BadRequestException(err.errors);
      }
      return err;
    }
  }

  @Post('register')
  async register(@Body() body: any) {
    try {
      const { email, password, name, role } = registerSchema.parse(body);
      const user = await this.authService.register(email, password, name, role);
      const { password: _password, ...rest } = user;
      return rest;
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        throw new BadRequestException(err.errors);
      }
      return err;
    }
  }
}
