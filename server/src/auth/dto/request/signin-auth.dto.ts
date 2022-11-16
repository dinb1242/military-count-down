import { ApiProperty } from '@nestjs/swagger';

export class SigninAuthDto {
    @ApiProperty({ description: '이메일', example: 'example@example.com' })
    readonly email: string;

    @ApiProperty({ description: '패스워드', example: '1234!5678MM!@' })
    readonly password: string;
}