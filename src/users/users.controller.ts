import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }
}
