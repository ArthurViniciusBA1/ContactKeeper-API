import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';

export class UsersInMemoryRepository implements UsersRepository {
  private database: User[] = [];

  create(data: CreateUserDto): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, {
      ...data,
    });

    this.database.push(newUser);

    return Promise.resolve(newUser);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.database);
  }

  findOneById(id: string): Promise<User> {
    return Promise.resolve(this.database.find((user) => user.id === id));
  }

  findOneByEmail(email: string): Promise<User> {
    return Promise.resolve(this.database.find((user) => user.email === email));
  }

  update(id: string, data: UpdateUserDto): Promise<User> {
    const index = this.database.findIndex((user) => user.id === id);
    this.database[index] = {
      ...this.database[index],
      ...data,
    };

    return Promise.resolve(this.database[index]);
  }

  delete(id: string): void | Promise<void> {
    const index = this.database.findIndex((user) => user.id === id);
    this.database.splice(index, 1);
  }
}
