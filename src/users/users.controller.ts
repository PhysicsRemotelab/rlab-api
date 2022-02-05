import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    create(@Body() userDto: UserDto): Promise<User> {
        return this.usersService.create(userDto);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions('delete:users')
    @Delete(':id')
    remove(@Param('id') id: string): Promise<number> {
        return this.usersService.remove(id);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions('update:users')
    @Put()
    update(@Body() userDto: UserDto): Promise<User> {
        return this.usersService.update(userDto);
    }
}