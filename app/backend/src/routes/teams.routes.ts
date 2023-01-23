import { Router } from 'express';
import { TeamController } from '../controller';
import Token from '../auth/JWT';

const teamsRouter = Router();
const token = new Token();

teamsRouter.get(
  '/',
  (req, res, next) => token.validate(req, res, next),
  (req, res, next) => TeamController.getAll(req, res, next),
);

teamsRouter.get(
  '/:id',
  (req, res, next) => token.validate(req, res, next),
  (req, res, next) => TeamController.getById(req, res, next),
);

export default teamsRouter;
