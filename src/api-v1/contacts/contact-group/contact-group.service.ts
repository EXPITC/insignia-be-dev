import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactListGroupService } from '../contact-list/contact-list.service';

@Injectable()
export class ContactGroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contactList: ContactListGroupService,
  ) {}

  async listContactGroup({
    search,
    pagination,
  }: {
    search?: string;
    pagination: {
      take: number;
      skip: number;
    };
  }) {
    const where: Prisma.ContactGroupWhereInput = {
      AND: {
        OR: [
          {
            name: {
              contains: search,
            },
            description: {
              contains: search,
            },
          },
        ],
      },
    };

    const data = await this.prisma.contactGroup.findMany({
      where,
      include: {
        contactList: {
          select: {
            Id: true,
            contact: true,
          },
        },
      },
      take: pagination.take,
      skip: pagination.skip,
    });

    const total = await this.prisma.contactGroup.count({ where });

    return {
      data,
      total,
    };
  }

  async createContactGroup({
    name,
    description,
    contactIds,
  }: {
    name: string;
    description: string;
    contactIds?: string[];
  }) {
    const contactGroup = await this.prisma.contactGroup.create({
      data: {
        name,
        description,
      },
    });

    if (contactIds)
      await this.contactList.addContactList(contactIds, contactGroup.Id);

    return contactGroup;
  }

  async deleteContactGroup(contactGroupId: string) {
    await this.contactList.deleteContactListGroup(contactGroupId);

    return await this.prisma.contactGroup.delete({
      where: {
        Id: contactGroupId,
      },
    });
  }

  async addContactListToGroup(contactIds: string[], contactGroupId: string) {
    const duplicateContactList = await this.prisma.contactList
      .findMany({
        where: {
          AND: contactIds.map((contactId) => ({
            contactId,
            contactGroupId,
          })),
        },
        select: {
          contactId: true,
        },
      })
      .then((res) => res.map(({ contactId }) => contactId));

    const cleanContactIds = contactIds.filter(
      (contactId) => !duplicateContactList.includes(contactId),
    );

    return await this.contactList.addContactList(
      cleanContactIds,
      contactGroupId,
    );
  }

  async removeContactListFromGroup(
    contactListIds: string[],
    contactGroupId: string,
  ) {
    const validContactListIds = await this.prisma.contactList
      .findMany({
        where: {
          AND: contactListIds.map((contactId) => ({
            contactId,
            contactGroupId,
          })),
        },
        select: {
          Id: true,
        },
      })
      .then((res) => res.map(({ Id }) => Id));

    return await this.contactList.removeContactList(validContactListIds);
  }
}
