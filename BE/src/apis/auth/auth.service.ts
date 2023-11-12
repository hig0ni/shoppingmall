import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceLoginOAuth,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly usersService: UsersService, //
  ) {}

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email: email });

    // 2. 일치하는 유저가 없으면?! 에러 던지기!!
    if (!user) throw new UnprocessableEntityException('아이디가 없습니다');

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?!
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. RefreshToken(=JWT)을 만들어서 브라우저 쿠키에 저장해서 보내주기
    this.setRefreshToken({ user, res: context.res });

    // 5. 일치하는 유저도 있고, 비밀번호도 맞았다
    //      => accessToken(=JWT)을 만들어서 브라우저에 전달하기
    return this.getAccessToken({ user });
  }

  async loginOAuth({ req, res }: IAuthServiceLoginOAuth) {
    // 1. 회원조회
    let user = await this.usersService.findOneByEmailAndIsAuth({
      email: req.user.email,
      isAuth: req.user.isAuth,
    });
    // 2. 회원가입이 안돼있다면? 자동회원가입
    if (!user) user = await this.usersService.authCreate({ ...req.user });

    // 3. 회원가입이 돼있다면? 로그인(refreshToken, accessToken 만들어서 브라우저에 전송)
    this.setRefreshToken({ user, res });
    res.redirect('http://localhost:3000/');
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { email: user.email, nickname: user.nickname, isAuth: user.isAuth },
      { secret: process.env.JWT_ACCESS, expiresIn: '1h' },
    );
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { email: user.email, nickname: user.nickname, isAuth: user.isAuth },
      { secret: process.env.JWT_REFRESH, expiresIn: '2w' },
    );

    // 개발환경
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/;`,
    // );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);

    // 배포환경
    // context.res.setHeader('set-Cookie',`refreshToken=${refreshToken}; path=/; domain=.mybakendsite.com; SameSite=None; Secure; httpOnly`,);
    // context.res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
  }
}
