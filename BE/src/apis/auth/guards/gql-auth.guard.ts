import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

// export class GqlAuthAccessGuard extends AuthGuard('access') {
//   getRequest(context: ExecutionContext) {
//     const gqlcontext = GqlExecutionContext.create(context);
//     return gqlcontext.getContext().req;
//   }
// }

// export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
//   getRequest(context: ExecutionContext) {
//     const gqlcontext = GqlExecutionContext.create(context);
//     return gqlcontext.getContext().req;
//   }
// }

// 위에 2개를 1개로 통합
export const GqlAuthGuard = (name) => {
  return class GqlAuthGuard extends AuthGuard(name) {
    getRequest(context: ExecutionContext) {
      const gqlcontext = GqlExecutionContext.create(context);
      return gqlcontext.getContext().req;
    }
  };
};
