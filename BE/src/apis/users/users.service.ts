import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  IUsersServiceAuthCreate,
  IUsersServiceCreate,
  IUsersServiceFindOneByEamil,
  IUsersServiceFindOneByEmailAndIsAuth,
  IUsersServiceFindOneByNickname,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOneByEmail({ email }: IUsersServiceFindOneByEamil): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  findOneByEmailAndIsAuth({
    email,
    isAuth,
  }: IUsersServiceFindOneByEmailAndIsAuth): Promise<User> {
    return this.usersRepository.findOne({ where: { email, isAuth } });
  }

  findOneByNickname({
    nickname,
  }: IUsersServiceFindOneByNickname): Promise<User> {
    return this.usersRepository.findOne({ where: { nickname } });
  }

  async changePassword({ email, password, password1, password2 }) {
    // 1. 변경할 비밀번호가 일치하는지 확인
    if (password1 !== password2)
      throw new ConflictException('비밀번호가 일치하지 않습니다.');

    // 2. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.findOneByEmail({ email: email });

    // 3. 일치하는 유저가 없으면?! 에러 던지기!!
    if (!user) throw new ConflictException('아이디가 없습니다');

    // 4. 변경할 비밀번호가 일치하지만, 기존 비밀번호가 틀렸다면?!
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new ConflictException('기존 비밀번호를 확인해 주세요.');

    const hashedPassword = await bcrypt.hash(password1, 10);

    await this.usersRepository.update(
      { email: email },
      { password: hashedPassword },
    );
    return '비밀번호 변경 성공';
  }

  async changeNickname({ email, beforeNickname, afterNickname: nickname }) {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.findOneByEmail({ email: email });

    // 2. 일치하는 유저가 없으면?! 에러 던지기!!
    if (!user) throw new ConflictException('아이디가 없습니다');

    const isNickname = await this.findOneByNickname({ nickname });
    if (isNickname) throw new ConflictException('존재하는 닉네임 입니다.');

    await this.usersRepository.update(
      { nickname: beforeNickname },
      { nickname: nickname },
    );
    return '닉네임 변경 성공';
  }

  async create({
    nickname,
    email,
    password,
  }: IUsersServiceCreate): Promise<User> {
    const isEmail = await this.findOneByEmail({ email });
    if (isEmail) throw new ConflictException('이미 등록된 이메일 입니다.');

    const isNickname = await this.findOneByNickname({ nickname });
    if (isNickname) throw new ConflictException('존재하는 닉네임 입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepository.save({
      nickname,
      email,
      password: hashedPassword,
    });
  }

  async authCreate({
    nickname,
    email,
    password,
    isAuth,
  }: IUsersServiceAuthCreate): Promise<User> {
    const isEmail = await this.findOneByEmailAndIsAuth({ email, isAuth });
    if (isEmail) throw new ConflictException('이미 등록된 이메일 입니다.');

    const isNickname = await this.findOneByNickname({ nickname });
    if (isNickname) throw new ConflictException('존재하는 닉네임 입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepository.save({
      nickname,
      email,
      password: hashedPassword,
      isAuth,
    });
  }

  async delete({ email, password }) {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.findOneByEmail({ email: email });
    if (!user) throw new ConflictException('아이디가 없습니다');

    // 2. 비밀번호가 일치하는지 확인하기
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new ConflictException('비밀번호를 확인해 주세요.');

    await this.usersRepository.delete({ email: email });
    return '회원 탈퇴 성공';
  }
}
