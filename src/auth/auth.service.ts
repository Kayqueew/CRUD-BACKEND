import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (request: Request) =>
        this.extractTokenFromHeader(request),
      ignoreExpiration: false,
      secretOrKey: 'secret_key',
      passReqToCallback: true,
    });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async validate(payload: any) {
    if (!payload || !payload.sub || !payload.name) {
      throw new UnauthorizedException('Token inválido');
    }
    return { id: payload.sub, name: payload.name };
  }
}
