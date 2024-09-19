import { Injectable } from '@nestjs/common';
import { Contact, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(data: Prisma.ContactCreateInput) {
    return await this.prisma.contact.create({
      data: {
        updatedAt: dayjs().toISOString(),
        ...data,
      },
    });
  }

  async getListContacts({
    search,
    pagination,
  }: {
    search?: string;
    pagination: { take: number; skip: number };
  }) {
    const where: Prisma.ContactWhereInput = {
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

    const data = await this.prisma.contact.findMany({
      where,
      take: pagination.take,
      skip: pagination.skip,
    });

    const total = await this.prisma.contact.count({
      where,
    });

    return {
      data,
      total,
    };
  }

  async updateContact(id: string, data: Partial<Contact>) {
    return await this.prisma.contact.update({
      where: { Id: id },
      data,
    });
  }

  async deleteContacts(id: string[]) {
    return await this.prisma.contact.deleteMany({
      where: {
        Id: {
          in: id,
        },
      },
    });
  }
}
