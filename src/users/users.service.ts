import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserDto } from './user.dto';
import { User } from './user.model';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REQUEST)
    private request,
    private readonly userRepository: UserRepository
  ) {}

  async create(userDto: UserDto): Promise<User> {
    let user = await this.userRepository.findByEmail(userDto.email);

    if (user) {
      user.last_login = new Date();
      user.sub = this.request.user.sub;
      await user.save();
    }

    if (!user) {
      user = await this.userRepository.create(userDto);
    }

    return user;
  }

}
