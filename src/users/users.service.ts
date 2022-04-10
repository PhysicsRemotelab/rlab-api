import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @Inject(REQUEST)
        private request
    ) {}

    public async create(userDto: UserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { email: userDto.email }
        });

        if (user) {
            user.lastLogin = new Date();
            user.sub = this.request.user.sub;
            await this.userRepository.save(user);
        }

        if (!user) {
            let user = new UserEntity();
            user.name = userDto.name;
            user.email = userDto.email;
            user.sub = userDto.sub;
            user.nickname = userDto.nickname;
            user.picture = userDto.picture;
            user = await user.save();
        }

        return user;
    }
}
