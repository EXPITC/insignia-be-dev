import { Injectable } from '@nestjs/common';
import { Prisma, User, UserRoleEnum } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(Id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        Id,
        isDeactivate: {
          equals: null,
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
        isDeactivate: {
          equals: null,
        },
      },
    });
  }

  async findAll({
    search,
    pagination,
  }: {
    search?: string;
    pagination: { take: number; skip: number };
  }) {
    const where: Prisma.UserWhereInput = {
      AND: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
        ],
      },
    };

    const data = await this.prisma.user
      .findMany({
        where,
        take: pagination.take,
        skip: pagination.skip,
      })
      .then((res) => res.map(({ password: _password, ...rest }) => rest));

    const total = await this.prisma.user.count({ where });

    return {
      data,
      total,
    };
  }

  async createUser(
    email: string,
    password: string,
    name: string,
    role: UserRoleEnum,
  ): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (user) throw new Error('User with this email has been created');

    // there actually should be add nodemailer to confirm the mail and complete the register cycle im sorry because my load of work..  i skip that process
    return await this.prisma.user.create({
      data: {
        updatedAt: dayjs().toISOString(),
        lastActivityAt: dayjs().toISOString(),
        isDeactivate: null,
        email,
        password,
        name,
        role,
      },
    });
  }

  async deleteUser(Id: string): Promise<User | null> {
    return await this.prisma.user.update({
      where: {
        Id,
      },
      data: {
        isDeactivate: dayjs().toDate(),
      },
    });
  }

  async updateUser(Id: string, data: Partial<User>): Promise<User | null> {
    // edit also must check if data edited is email then its must send verification again

    return await this.prisma.user.update({
      where: { Id },
      data: {
        updatedAt: dayjs().toISOString(),
        ...data,
      },
    });
  }
}
