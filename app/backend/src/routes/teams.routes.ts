import { Router } from 'express';
import { TeamController } from '../controller';

const teamsRouter = Router();

teamsRouter.get(
  '/',
  (req, res, next) => TeamController.getAll(req, res, next),
);

teamsRouter.get(
  '/:id',
  (req, res, next) => TeamController.getById(req, res, next),
);

export default teamsRouter;
