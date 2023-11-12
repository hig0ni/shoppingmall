export interface IUsersServiceCreate {
  email: string;
  nickname: string;
  password: string;
}

export interface IUsersServiceAuthCreate {
  email: string;
  nickname: string;
  password: string;
  isAuth: number;
}

export interface IUsersServiceFindOneById {
  id: string;
}

export interface IUsersServiceFindOneByEamil {
  email: string;
}

export interface IUsersServiceFindOneByEmailAndIsAuth {
  email: string;
  isAuth: number;
}

export interface IUsersServiceFindOneByNickname {
  nickname: string;
}
