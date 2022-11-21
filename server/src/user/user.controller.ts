import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/auth-public.decorator';
import { UserResponseDto } from './dto/response/user-response.dto';

@ApiTags('유저 API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: '회원가입 API',
    description:
      'DTO 를 전달받아 회원가입을 수행한다. 이때, 비밀번호는 해싱, 휴대번호는 암호화되어 저장된다.<br/>' +
      '데이터 검증을 통해 이메일 형식에 부합하지 않는다면 예외를 발생시킨다.',
  })
  @ApiCreatedResponse({
    description: '가입 성공',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: '가입 실패 - 기존재 이메일',
  })
  async signUpUser(@Body() userData: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.signUpUser(userData);
  }
}
