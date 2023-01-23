type UserInfo = {
  email: string;
  role: string;
};

export default interface IToken {
  iat: string;
  exp: string;
  data: UserInfo
}
