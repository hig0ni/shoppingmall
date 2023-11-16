import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// 패턴은 이렇고 패키지 진짜 이름은 다름!!
// import { KakaoStrategy } from 'passport-kakao'
// import { NaverStrategy } from 'passport-naver'
// import { GoogleStrategy } from 'passport-google'

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //   jwtFromRequest: (req) => {
      //     const temp = req.headers.Authorizaion; // Bearer aslkgjdfgjdfs;
      //     const accessToken = temp.toLowercase().replace('bearer ', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: process.env.JWT_ACCESS,
    });
  }

  validate(payload) {
    console.log(payload);

    return {
      nickname: payload.nickname,
      email: payload.email,
      isAuth: payload.isAuth,
      isAdmin: payload.isAdmin,
    };
  }
}
