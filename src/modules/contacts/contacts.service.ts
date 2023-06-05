import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}

  async create(createContactDto: CreateContactDto, userUUID: string) {
    const contact = this.contactsRepository.create(createContactDto, userUUID);

    return contact;
  }

  async findUserContacts(userUUID: string) {
    return await this.contactsRepository.findUserContacts(userUUID);
  }

  async findOne(id: string, userUUID: string) {
    const contact = await this.contactsRepository.findOneById(id);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    if (contact.user_uuid !== userUUID) {
      throw new ForbiddenException('Access denied');
    }

    return contact;
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
    userUUID: string,
  ) {
    const contact = await this.contactsRepository.update(id, updateContactDto);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    if (contact.user_uuid != userUUID) {
      throw new ForbiddenException('Access denied');
    }

    return contact;
  }

  async remove(id: string, userUUID: string) {
    const contact = await this.contactsRepository.findOneById(id);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    if (contact.user_uuid != userUUID) {
      throw new ForbiddenException('Access denied');
    }

    await this.contactsRepository.delete(id);
  }
}
