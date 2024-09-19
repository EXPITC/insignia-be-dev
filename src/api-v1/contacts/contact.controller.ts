import { Body, Post, UseGuards } from '@nestjs/common';
import { ApiV1Controller } from '../prefix.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContactService } from './contact.service';
import {
  addContactSchema,
  deleteContactSchema,
  editContactSchema,
  listContactSchema,
} from './schema/contact.schema';

@ApiV1Controller('contact')
@UseGuards(JwtAuthGuard)
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('list')
  async list(@Body() body: any) {
    const { search, pagination } = listContactSchema.parse(body);
    return this.contactService.getListContacts({ search, pagination });
  }

  @Post('add')
  async add(@Body() body: any) {
    const { data } = addContactSchema.parse(body);
    return this.contactService.createContact(data);
  }

  @Post('edit')
  async edit(@Body() body: any) {
    const { id, data } = editContactSchema.parse(body);
    return this.contactService.updateContact(id, data);
  }

  @Post('delete')
  async delete(@Body() body: any) {
    const { id } = deleteContactSchema.parse(body);
    return this.contactService.deleteContacts(id);
  }
}
