import { Router } from 'express';
import { LoginController } from '../controller';
import LoginValidation from '../middlewares/LoginValidation';

const loginRouter = Router();
const validation = new LoginValidation();
const controller = new LoginController();

export default class Login {
  constructor(public route = loginRouter) {
    this.route = route;

    this.route.post(
      '/',
      (req, res, next) => validation.credentialValidation(req, res, next),
      (req, res, next) => controller.login(req, res, next),
    );

    this.route.get(
      '/validate',
      (req, res, next) => controller.validateRole(req, res, next),
    );
  }
}
