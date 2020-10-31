import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User
    ) { }

    findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    create(userDto: UserDto): Promise<User> {
        const user = new User();
        user.name = userDto.name;
        user.email = userDto.email;
        user.nickname = userDto.nickname;
        user.gravatar = userDto.gravatar;
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
        user.nickname = userDto.nickname;
        user.gravatar = userDto.gravatar;
        return user.save();
    }

    findOne(id: string): Promise<User> {
        return this.userModel.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ where: { email } });
    }
}