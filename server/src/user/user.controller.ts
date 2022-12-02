import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/auth-public.decorator';
import { UserResponseDto } from './dto/response/user-response.dto';
import { CheckUserEmailDto } from './dto/request/check-user-email.dto';

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

  @Public()
  @Post('check')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '이메일 중복 여부 확인 API',
    description: '이메일을 Body 로 전달받아 해당하는 이메일을 사용할 수 있는지 체크한다.',
  })
  @ApiOkResponse({ description: '사용 가능 여부', type: Boolean })
  async checkEmail(@Body() requestDto: CheckUserEmailDto) {
    return this.userService.checkEmail(requestDto.email);
  }
}
