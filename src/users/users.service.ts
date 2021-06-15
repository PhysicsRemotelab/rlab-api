import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        @Inject(REQUEST)
        private request
    ) { }

    findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async create(userDto: UserDto): Promise<User> {
        const user1 = await this.userModel.findOne({ where: { email: userDto.email } });
        if(user1) {
            user1.lastLogin = new Date();
            user1.sub = this.request.user.sub;
            return user1.save();
        }

        const user = new User();
        user.name = userDto.name;
        user.email = userDto.email;
        user.sub = userDto.sub;
        user.nickname = userDto.nickname;
        user.picture = userDto.picture;
        return user.save();
    }

    async remove(id: string): Promise<number> {
        const lab = await this.userModel.findOne({ where: { id } });
        await lab.destroy();
        return 1;
    }

    async update(userDto: UserDto): Promise<User> {
        const user = await this.userModel.findOne({ where: { id: userDto.id } });
        user.name = userDto.name;
        user.email = userDto.email;
        user.sub = userDto.sub;
        user.nickname = userDto.nickname;
        user.picture = userDto.picture;
        return user.save();
    }

    findOne(id: string): Promise<User> {
        return this.userModel.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ where: { email } });
    }
}