import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

const getToken = () => {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  return result;
};
const randomNumber = getToken();

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:5656/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      nickname: `${profile.displayName}#${randomNumber}`,
      email: profile.emails[0].value,
      password: '1234',
      isAuth: 1,
    };
  }
}
