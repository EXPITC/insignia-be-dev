import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactListGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async addContactList(contactIds: string[], contactGroupId: string) {
    return await this.prisma.contactList.createMany({
      data: contactIds.map((contactId) => ({
        contactId,
        contactGroupId,
      })),
    });
  }

  async removeContactList(Ids: string[]) {
    return await this.prisma.contactList.deleteMany({
      where: {
        Id: {
          in: Ids,
        },
      },
    });
  }

  async deleteContactListGroup(contactGroupId: string) {
    return await this.prisma.contactList.deleteMany({
      where: {
        contactGroupId,
      },
    });
  }
}
