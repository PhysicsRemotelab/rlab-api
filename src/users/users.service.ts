import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserDto } from './user.dto';
import { User } from './user.model';
import { getRepository, getConnection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REQUEST)
    private request
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const user = await getRepository(User).findOne({
      where: { email: userDto.email }
    });

    if (user) {
      user.last_login = new Date();
      user.sub = this.request.user.sub;
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ last_login: new Date(), sub: this.request.user.sub })
        .where('id = :id', { id: user.id })
        .execute();
    }

    if (!user) {
      let user = new User();
      user.name = userDto.name;
      user.email = userDto.email;
      user.sub = userDto.sub;
      user.role = userDto.role;
      user.nickname = userDto.nickname;
      user.picture = userDto.picture;
      user.role = 'Student';
      user = await user.save();
    }

    return user;
  }
}
