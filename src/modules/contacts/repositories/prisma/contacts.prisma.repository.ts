import { Injectable } from '@nestjs/common';
import { ContactsRepository } from '../contacts.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDto, userUUID: string): Promise<Contact> {
    const contact = new Contact();
    Object.assign(Contact, { ...data });

    const newContact = await this.prisma.contact.create({
      data: {
        name: contact.name,
        email: contact.email,
        telephone: contact.telephone,
        created_at: contact.created_at,
        patched_at: contact.patched_at,
        user_uuid: userUUID,
      },
    });

    return plainToInstance(Contact, newContact);
  }

  async findUserContacts(userUUID: string): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany({
      where: {
        user_uuid: userUUID,
      },
    });

    return plainToInstance(Contact, contacts);
  }

  async findOneById(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({ where: { id } });

    return plainToInstance(Contact, contact);
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const patchedContact = await this.prisma.contact.update({
      where: { id },
      data: { ...data, patched_at: new Date().toISOString() },
    });

    return plainToInstance(Contact, patchedContact);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({ where: { id } });
  }
}
