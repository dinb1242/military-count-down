import { JwtService } from '@nestjs/jwt';
import { Instant, LocalDateTime, ZoneId } from 'js-joda';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtUtils {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * JWT 토큰이 만료되었는지 체크한다.
   * @param token
   * @return 만료 여부 Boolean
   */
  public checkExpired(token: string): boolean {
    const jwtVerified: any = this.jwtService.verify(token);
    const exp = jwtVerified.exp * 1000;
    const expLocalDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(exp), ZoneId.of('UTC+9'));

    return expLocalDateTime.isBefore(LocalDateTime.now());
  }
}
