import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOneById(id: string): Promise<User>;
  abstract findOneByEmail(email: string): Promise<User>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
  abstract delete(id: string): Promise<void> | void;
}
