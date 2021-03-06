import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload.role === 'admin') {
      return {
        userId: payload.sub,
        username: payload.username,
        role: payload.role,
        storeId: payload.storeId,
        fcmToken: payload.fcmToken,
      };
    }
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
      fcmToken: payload.fcmToken,
    };
  }
}
