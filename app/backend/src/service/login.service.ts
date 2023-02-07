import User from '../database/models/user.model';
import { IUser } from '../interfaces';

export default class LoginService {
  constructor(private _model = User) { this._model = _model; }
  public async getUser(email: string): Promise<IUser | null> {
    const response = await this._model.findOne({ where: { email } });
    return response;
  }
}
