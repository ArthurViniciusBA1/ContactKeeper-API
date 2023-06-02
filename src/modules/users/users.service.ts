import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findOneByEmail(
      createUserDto.email,
    );

    if (findUser) {
      throw new ConflictException('An user with this email already exists');
    }

    const user = await this.usersRepository.create(createUserDto);

    return user;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new ConflictException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const findUser = await this.usersRepository.findOneByEmail(
        updateUserDto.email,
      );

      if (findUser) {
        throw new ConflictException('An user with this email already exists');
      }
    }
    
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return { message: 'User removed' };
  }
}
