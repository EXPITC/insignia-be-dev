import { Module } from '@nestjs/common';
import { ContactGroupController } from './contact-group.controller';
import { ContactGroupService } from './contact-group.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactListGroupService } from '../contact-list/contact-list.service';

@Module({
  providers: [PrismaService, ContactListGroupService, ContactGroupService],
  controllers: [ContactGroupController],
})
export class ContactGroupModule {}
