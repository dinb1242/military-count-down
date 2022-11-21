import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CipherUtils } from 'src/common/utils/cipher.util';
import { UserResponseDto } from './dto/response/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * 유저 회원가입을 수행한다.
   * 이메일에 대하여 데이터베이스 내에 이미 존재하는 유저라면 예외를 발생시킨다.
   * @param data 회원가입 대상 유저에 대한 UserCreateInput 객체
   * @returns 유저에 대한 가입 정보를 리턴한다.
   */
  async signUpUser(data: Prisma.UserCreateInput): Promise<UserResponseDto> {
    const { password, phone } = data;

    // 비밀번호 해싱 및 휴대 번호를 암호화한다.
    const hashedPassword = await CipherUtils.hash(password);
    const encPhone = await CipherUtils.encodeByAES56(phone);

    data.password = hashedPassword;
    data.phone = encPhone;

    const user: User = await this.prismaService.user.create({
      data,
    });

    return new UserResponseDto(user);
  }

  async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }

  // AuthService 에서 유저 이메일을 통해 유저 객체를 얻어내기 위한 헬퍼 메소드
  async loadUserByEmail(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const { email } = userWhereUniqueInput;
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
