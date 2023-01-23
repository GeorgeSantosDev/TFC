import { Router } from 'express';
import { LoginController } from '../controller';
import LoginValidation from '../middlewares/LoginValidation';
import Token from '../auth/JWT';

const loginRouter = Router();
const token = new Token();

loginRouter.post(
  '/',
  (req, res, next) => LoginValidation.fieldsValidation(req, res, next),
  (req, res, next) => LoginValidation.credentialValidation(req, res, next),
  (req, res, next) => LoginController.login(req, res, next),
);

loginRouter.get(
  '/validate',
  (req, res, next) => token.validate(req, res, next),
  (req, res, next) => LoginController.validateRole(req, res, next),
);

export default loginRouter;
