import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async findByEmail(email: string): Promise<User> {
    return await this.entityManager.query(
      'SELECT * FROM users WHERE users.email = ?',
      [email]
    );
  }

  public async findBySub(sub: string): Promise<User> {
    return await this.entityManager.query(
      'SELECT * FROM users WHERE users.sub = ?',
      [sub]
    );
  }

  public async create(userDto: UserDto): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.sub = userDto.sub;
    user.role = userDto.role;
    user.nickname = userDto.nickname;
    user.picture = userDto.picture;
    return user.save();
  }
}
