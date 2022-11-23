import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../common/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { User as UserModel } from '@prisma/client';
import { SignInUnauthorizedException } from '../common/exceptions/sign-in-unauthorized.exception';
import { convert, LocalDateTime } from 'js-joda';
import { JwtService } from '@nestjs/jwt';
import { JwtUtils } from '../common/utils/jwt.util';
import { CipherUtils } from '../common/utils/cipher.util';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let userService: UserService;
  let jwtService: JwtService;
  let jwtUtils: JwtUtils;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, UserService, JwtService, JwtUtils],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    jwtUtils = module.get<JwtUtils>(JwtUtils);
  });

  describe('validateUser', () => {
    it('이메일을 통해 존재하지 않는 유저를 탐색한다', async function () {
      /**
       * given
       */

      const email = 'example@example.com';
      const password = 'examplePassword';

      /**
       * when
       */

      // userService.loadUserByEmail 을 Mocking 한다.
      const loadUserByEmailSpyOn = jest.spyOn(userService, 'loadUserByEmail').mockResolvedValue(null);

      /**
       * then
       */

      try {
        await service.validateUser(email, password);
      } catch (e) {
        expect(e).toBeInstanceOf(SignInUnauthorizedException);
      }
      expect(loadUserByEmailSpyOn).toHaveBeenCalledWith({ email: email });
    });

    it('이메일을 통해 존재하는 유저를 찾고, 비밀번호 검증을 수행한다.', async function () {
      /**
       * given
       */

      const email = 'example@example.com';
      const password = 'examplePassword';

      // loadUserByEmail 반환 결과
      const loadUserByEmailResult: UserModel = {
        id: 1,
        email: 'example@example.com',
        password: await CipherUtils.hash('examplePassword'),
        name: '홍길동',
        phone: '01012345678',
        status: 1,
        createdAt: convert(LocalDateTime.now()).toDate(),
        updatedAt: convert(LocalDateTime.now()).toDate(),
      };

      // 최종 반환 객체
      const { password: passwordExcepted, ...loadUserByEmailResultWithoutPassword } = loadUserByEmailResult;

      /**
       * when
       */

      // 반환되는 결과를 Mocking 한다.
      const loadUserByEmailSpyOn = jest.spyOn(userService, 'loadUserByEmail').mockResolvedValue(loadUserByEmailResult);

      /**
       * then
       */
      const result = await service.validateUser(email, password);

      expect(loadUserByEmailSpyOn).toHaveBeenCalledWith({ email: email });
      expect(result).toEqual(loadUserByEmailResultWithoutPassword);
    });

    it('이메일을 통해 존재하는 유저를 찾고, 비밀번호를 틀린다.', async function () {
      /**
       * given
       */

      const email = 'example@example.com';
      const password = 'incorrectPassword';

      // loadUserByEmail 반환 결과
      const loadUserByEmailResult: UserModel = {
        id: 1,
        email: 'example@example.com',
        password: await CipherUtils.hash('examplePassword'),
        name: '홍길동',
        phone: '01012345678',
        status: 1,
        createdAt: convert(LocalDateTime.now()).toDate(),
        updatedAt: convert(LocalDateTime.now()).toDate(),
      };

      // 최종 반환 객체
      const { password: passwordExcepted, ...loadUserByEmailResultWithoutPassword } = loadUserByEmailResult;

      /**
       * when
       */

      // 반환되는 결과를 Mocking 한다.
      const loadUserByEmailSpyOn = jest.spyOn(userService, 'loadUserByEmail').mockResolvedValue(loadUserByEmailResult);

      /**
       * then
       */
      try {
        await service.validateUser(email, password);
      } catch (e) {
        expect(e).toBeInstanceOf(SignInUnauthorizedException);
      }
      expect(loadUserByEmailSpyOn).toHaveBeenCalledWith({ email: email });
    });
  });
});
