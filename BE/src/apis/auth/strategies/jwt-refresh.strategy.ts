import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

// 패턴은 이렇고 패키지 진짜 이름은 다름!!
// import { KakaoStrategy } from 'passport-kakao'
// import { NaverStrategy } from 'passport-naver'
// import { GoogleStrategy } from 'passport-google'

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie; // refreshToken=asdasdfew
        const refreshToken = cookie?.replace('refreshToken=', '');
        return refreshToken;
      },

      secretOrKey: process.env.JWT_REFRESH,
    });
  }

  validate(payload) {
    console.log(payload);

    return {
      nickname: payload.nickname,
      email: payload.email,
      isAuth: payload.isAuth,
    };
  }
}
