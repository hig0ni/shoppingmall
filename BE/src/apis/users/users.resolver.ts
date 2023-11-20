import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';
import { UserResponseType } from '../../commons/interfaces/user-response-type';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => UserResponseType)
  fetchUser(@Context() context: IContext): UserResponseType {
    // 유저 정보 꺼내오기
    console.log('=================');
    console.log('인가에 성공하였습니다.');
    console.log('=================');

    const { nickname, isAuth, isAdmin } = context.req.user;
    return { nickname, isAuth, isAdmin };
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Number)
  fetchPoint(@Context() context: IContext): Promise<number> {
    const { email } = context.req.user;
    return this.usersService.checkPoint({ email });
  }

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('nickname') nickname: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.usersService.create({ email, nickname, password });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  changeNickname(
    @Context() context: IContext,
    @Args('afterNickname') afterNickname: string,
  ) {
    const email = context.req.user.email;
    const beforeNickname = context.req.user.nickname;
    return this.usersService.changeNickname({
      email,
      beforeNickname,
      afterNickname,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  changePassword(
    @Context() context: IContext,
    @Args('password') password: string,
    @Args('password1') password1: string,
    @Args('password2') password2: string,
  ) {
    const email = context.req.user.email;
    return this.usersService.changePassword({
      email,
      password,
      password1,
      password2,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  deleteUser(@Context() context: IContext, @Args('password') password: string) {
    const email = context.req.user.email;
    return this.usersService.delete({
      email,
      password,
    });
  }
}
