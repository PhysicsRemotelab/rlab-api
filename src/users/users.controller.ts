import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequest, Unauthorized } from '../core/swagger.annotations';

@ApiResponse(BadRequest)
@ApiResponse(Unauthorized)
@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiResponse({
        status: 201,
        description: 'Created',
        type: UserEntity
    })
    @ApiOperation({
        summary: 'Create user'
    })
    @UseGuards(AuthGuard('jwt'))
    @Post()
    public create(@Body() userDto: UserDto): Promise<UserEntity> {
        return this.usersService.create(userDto);
    }

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: UserEntity
    })
    @ApiOperation({
        summary: 'Update user'
    })
    @UseGuards(AuthGuard('jwt'))
    @Put()
    public update(@Body() userDto: UserDto): Promise<UserEntity> {
        return this.usersService.update(userDto);
    }
}
