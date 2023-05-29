import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);

    return user;
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOneById(id);
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return { message: 'User removed'};
  }
}
