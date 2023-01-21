import * as jwt from 'jsonwebtoken';

export default class JWT {
  private _secret: jwt.Secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
  private _jwtConfig: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1h',
  };

  public createToken(userEmail: string): string {
    const token = jwt.sign({ data: { email: userEmail } }, this._secret, this._jwtConfig);
    return token;
  }
}
