export default interface ILogin {
  password: string;
  email: string;
}

export interface ILoginTokenBody extends ILogin {
  role: string;
};