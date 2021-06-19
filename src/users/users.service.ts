import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/role.model';
import { UserRole } from 'src/user_roles/user_role.model';
import { UserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        @InjectModel(Role)
        private readonly roleModel: typeof Role,
        @InjectModel(UserRole)
        private readonly userRoleModel: typeof UserRole,
        @Inject(REQUEST)
        private request
    ) { }

    findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async create(userDto: UserDto): Promise<User> {
        let user = await this.userModel.findOne({ where: { email: userDto.email } });

        if(user) {
            user.lastLogin = new Date();
            user.sub = this.request.user.sub;
            await user.save();
        }

        if (!user) {
            user = new User();
            user.name = userDto.name;
            user.email = userDto.email;
            user.sub = userDto.sub;
            user.nickname = userDto.nickname;
            user.picture = userDto.picture;
            await user.save();
        }

        const role = await this.roleModel.findOne({ where: { name: userDto.roles } });
        await this.createUserRole(user.id, role.id);

        return user;
    }

    private async createUserRole(userId: number, roleId: number): Promise<number> {
        const exists = await this.userRoleModel.findOne({ where: { user_id: userId, role_id: roleId } });
        if (exists) {
            return 1;
        }

        const userRole = new UserRole();
        userRole.userId = userId;
        userRole.roleId = roleId;
        await userRole.save();
        return 1;
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