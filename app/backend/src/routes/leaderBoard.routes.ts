import { Router } from 'express';
import { LeaderBoardController } from '../controller';

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/',
  (req, res, next) => LeaderBoardController.generalClassification(req, res, next),
);

leaderBoardRouter.get(
  '/home',
  (req, res, next) => LeaderBoardController.homeClassification(req, res, next),
);

leaderBoardRouter.get(
  '/away',
  (req, res, next) => LeaderBoardController.awayClassification(req, res, next),
);

export default leaderBoardRouter;
