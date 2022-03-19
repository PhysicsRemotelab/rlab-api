import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserDto } from './user.dto';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject(REQUEST)
        private request
    ) {}

    async create(userDto: UserDto): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { email: userDto.email }
        });

        if (user) {
            user.last_login = new Date();
            user.sub = this.request.user.sub;
            await this.userRepository.save(user);
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
