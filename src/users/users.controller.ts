import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({
        status: 200,
        description: 'Create user',
        type: UserEntity
    })
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    create(@Body() userDto: UserDto): Promise<UserEntity> {
        return this.usersService.create(userDto);
    }
}
