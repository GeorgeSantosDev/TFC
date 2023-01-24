import { Router } from 'express';
import { MacthesController } from '../controller';

const matchesRouter = Router();

matchesRouter.get(
  '/',
  (req, res, next) => MacthesController.getAllMatches(req, res, next),
);

matchesRouter.post(
  '/',
  (req, res, next) => MacthesController.createMatch(req, res, next),
);

export default matchesRouter;
