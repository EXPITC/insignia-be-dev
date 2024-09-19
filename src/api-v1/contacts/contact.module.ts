import { Module } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ContactGroupModule } from './contact-group/contact-group.module';

@Module({
  imports: [ContactGroupModule],
  providers: [PrismaService, UserService, ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
