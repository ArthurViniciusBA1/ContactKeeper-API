import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactsRepository {
  abstract create(
    data: CreateContactDto,
    userUUID: string,
  ): Promise<Contact> | Contact;
  abstract findUserContacts(userId: string): Promise<Contact[]>;
  abstract findOneById(id: string): Promise<Contact | undefined>;
  abstract update(
    id: string,
    data: UpdateContactDto,
  ): Promise<Contact> | Contact;
  abstract delete(id: string): Promise<void> | void;
}
