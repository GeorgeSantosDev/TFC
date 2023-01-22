import * as bcrypt from 'bcryptjs';

export default class Crypt {
  static encrypt(password: string): string {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  static verify(password: string, dbPassword: string): boolean {
    return bcrypt.compareSync(password, dbPassword);
  }
}
