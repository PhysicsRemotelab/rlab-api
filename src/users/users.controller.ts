import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequest, Unauthorized } from 'src/core/swagger.annotations';

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
    @UseGuards(AuthGuard('jwt'),)
    @Post()
    create(@Body() userDto: UserDto): Promise<UserEntity> {
        return this.usersService.create(userDto);
    }
}
