import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User as UserModel } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('유저 API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '회원가입 API', description: 'DTO 를 전달받아 회원가입을 수행한다. 이때, 비밀번호는 해싱, 휴대번호는 암호화되어 저장된다.' })
  async signUpUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return await this.userService.signUpUser(userData);
  }
}
