import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User as UserModel } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('유저 API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return await this.userService.createUser(userData);
  }
}
