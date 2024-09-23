import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersServiceCreate } from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create({ email, password, name, age }: IUsersServiceCreate): Promise<User> {
    return this.usersRepository.save({
      email,
      password,
      name,
      age,
      // name: name, age: age ... 처럼 해야하지만 key-value가 동일한 문자열이므로 shorthand property
    });
  }
}
