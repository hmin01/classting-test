import { Injectable, NestMiddleware } from '@nestjs/common';
// Exception
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
// JWT
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  use(req: any, res: any, next: (error?: any) => void) {
    // Authorization 추출
    const authorization = req.headers.authorization;
    // 예외 처리
    if (authorization === undefined || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    try {
      // JWT Token 추출
      const token = authorization.split(' ')[1];
      // 복호화
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      // 예외 처리
      if (decoded.user_id === undefined) {
        throw new UnauthorizedException();
      }

      // 요청 객체에 사용자 ID 추가
      req.user = decoded.user_id;
      // 컨트롤러로 전달
      next();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
