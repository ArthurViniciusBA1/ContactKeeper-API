import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { ContactsRepository } from '../contacts.repository';

export class ContactsInMemoryRepository implements ContactsRepository {
  private database: Contact[] = [];

  async create(data: CreateContactDto): Promise<Contact> {
    const newContact = new Contact();
    Object.assign(newContact, {
      ...data,
    });

    this.database.push(newContact);

    return Promise.resolve(newContact);
  }

  async findAll(): Promise<Contact[]> {
    return Promise.resolve(this.database);
  }

  async findOneById(id: string): Promise<Contact> {
    return Promise.resolve(this.database.find((contact) => contact.id === id));
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const index = this.database.findIndex((contact) => contact.id === id);

    this.database[index] = {
      ...this.database[index],
      ...data,
    };

    return Promise.resolve(this.database[index]);
  }

  async delete(id: string): Promise<void> {
    const index = this.database.findIndex((contact) => contact.id === id);
    this.database.splice(index, 1);
  }
}
