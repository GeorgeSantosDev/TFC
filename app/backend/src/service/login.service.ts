import User from '../database/models/user.model';
import { IUser } from '../interfaces';

export default class LoginService {
  static async getUser(email: string): Promise<IUser | null> {
    const response = await User.findOne({ where: { email } });
    return response;
  }
}
