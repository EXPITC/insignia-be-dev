import { Body, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api-v1/auth/jwt-auth.guard';
import { ContactGroupService } from './contact-group.service';
import { ApiV1Controller } from 'src/api-v1/prefix.decorator';
import {
  addContactGroupSchema,
  addContactToGroupSchema,
  listContactGroupSchema,
  removeContactFromGroupSchema,
  removeContactGroupSchema,
} from './schema/contactGroup.schema';

@ApiV1Controller('contact/group')
@UseGuards(JwtAuthGuard)
export class ContactGroupController {
  constructor(private readonly contactGroupService: ContactGroupService) {}

  @Post('list')
  async list(@Body() body: any) {
    try {
      const { search, pagination } = listContactGroupSchema.parse(body);

      return this.contactGroupService.listContactGroup({
        search,
        pagination,
      });
    } catch (err) {
      return err;
    }
  }

  @Post('add')
  async add(@Body() body: any) {
    try {
      const { data } = addContactGroupSchema.parse(body);

      return this.contactGroupService.createContactGroup(data);
    } catch (err) {
      return err;
    }
  }

  @Post('remove')
  async remove(@Body() body: any) {
    try {
      const { ContactGroupId } = removeContactGroupSchema.parse(body);

      return await this.contactGroupService.deleteContactGroup(ContactGroupId);
    } catch (err) {
      return err;
    }
  }

  @Post('add/contact')
  async addContactToGroup(@Body() body: any) {
    try {
      const { ContactGroupId, contactIds } =
        addContactToGroupSchema.parse(body);

      return await this.contactGroupService.addContactListToGroup(
        contactIds,
        ContactGroupId,
      );
    } catch (err) {
      return err;
    }
  }
  @Post('remove/contact')
  async removeContactToGroup(@Body() body: any) {
    try {
      const { contactIds, ContactGroupId } =
        removeContactFromGroupSchema.parse(body);

      return await this.contactGroupService.removeContactListFromGroup(
        contactIds,
        ContactGroupId,
      );
    } catch (err) {
      return err;
    }
  }
}
