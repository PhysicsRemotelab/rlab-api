import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { UserDto } from './user.dto';
import UserEntity from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject(REQUEST)
        private request
    ) { }

    async create(userDto: UserDto): Promise<UserEntity> {
        let user = await this.userRepository.findOne({ where: { email: userDto.email } });

        if(user) {
            user.lastLogin = new Date();
            user.sub = this.request.user.sub;
            await user.save();
        }

        if (!user) {
            user = new UserEntity();
            user.name = userDto.name;
            user.email = userDto.email;
            user.sub = userDto.sub;
            user.nickname = userDto.nickname;
            user.picture = userDto.picture;
            await user.save();
        }
        return user;
    }
}
