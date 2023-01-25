import { Router } from 'express';
import { MacthesController } from '../controller';
import MatchesValidations from '../middlewares/CreateMacthValidations';
import Token from '../auth/JWT';

const matchesRouter = Router();
const token = new Token();

matchesRouter.get(
  '/',
  (req, res, next) => MacthesController.getAllMatches(req, res, next),
);

matchesRouter.post(
  '/',
  (req, res, next) => token.validate(req, res, next),
  (req, res, next) => MatchesValidations.validateTeams(req, res, next),
  (req, res, next) => MacthesController.createMatch(req, res, next),
);

matchesRouter.patch(
  '/:id/finish',
  (req, res, next) => MacthesController.updateProgress(req, res, next),
);

matchesRouter.patch(
  '/:id',
  (req, res, next) => MacthesController.updateGoals(req, res, next),
);

export default matchesRouter;
