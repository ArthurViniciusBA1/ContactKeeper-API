import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}

  async create(createContactDto: CreateContactDto) {
    const contact = this.contactsRepository.create(createContactDto);

    return contact;
  }

  async findAll() {
    return await this.contactsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.contactsRepository.findOneById(id);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return await this.contactsRepository.update(id, updateContactDto);
  }

  async remove(id: string) {
    await this.contactsRepository.delete(id);
    return { message: 'Contact deleted'};
  }
}
