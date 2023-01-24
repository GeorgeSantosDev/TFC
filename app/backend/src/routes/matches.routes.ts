import { Router } from 'express';
import { MacthesController } from '../controller';

const matchesRouter = Router();

matchesRouter.get(
  '/',
  (req, res, next) => MacthesController.getAllMatches(req, res, next),
);

export default matchesRouter;
