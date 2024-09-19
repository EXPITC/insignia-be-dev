import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contacts/contact.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [AuthModule, ContactModule, UserModule],
  controllers: [],
  providers: [],
})
export class ApiV1Module {}
