import { Router } from 'express';
import { LoginController } from '../controller';
import LoginValidation from '../middlewares/LoginValidation';

const loginRouter = Router();

loginRouter.post(
  '/',
  (req, res, next) => LoginValidation.fieldsValidation(req, res, next),
  (req, res, next) => LoginValidation.credentialValidation(req, res, next),
  (req, res, next) => LoginController.login(req, res, next),
);

export default loginRouter;
