import { Delete, UseGuards, Req, Post, Body } from '@nestjs/common';
import { ApiV1Controller } from '../prefix.decorator';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { listUserSchema, updateUserSchema } from './schema/users.schema';
import { AuthService } from '../auth/auth.service';

@ApiV1Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Delete('delete')
  async delete(@Req() request: { user: User }) {
    try {
      const userId = request.user.Id;

      return await this.userService.deleteUser(userId);
    } catch (err: any) {
      return err;
    }
  }

  @Post('edit')
  async update(@Req() request: { user: User }, @Body() body: any) {
    try {
      const userId = request.user.Id;
      const { data } = updateUserSchema.parse(body);
      if (!!data?.password)
        data.password = await this.authService.hashPassword(data.password);

      return await this.userService.updateUser(userId, data);
    } catch (err: any) {
      return err;
    }
  }

  @Post('list')
  async list(@Body() body: any) {
    try {
      const { search, pagination } = listUserSchema.parse(body);

      return await this.userService.findAll({
        search,
        pagination,
      });
    } catch (err: any) {
      return err;
    }
  }
}
