import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

const getToken = () => {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  return result;
};
const randomNumber = getToken();

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: 'http://localhost:5656/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      nickname: `${profile.displayName}#${randomNumber}`,
      email: profile._json.kakao_account.email,
      password: '1234',
      isAuth: 2,
    };
  }
}
