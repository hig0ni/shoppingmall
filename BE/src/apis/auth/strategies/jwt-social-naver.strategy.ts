import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver-v2';

const getToken = () => {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  return result;
};
const randomNumber = getToken();

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: 'http://localhost:5656/login/naver',
      scope: ['email', 'name'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      nickname: `${profile.name}#${randomNumber}`,
      email: profile.email,
      password: '1234',
      isAuth: 3,
    };
  }
}
