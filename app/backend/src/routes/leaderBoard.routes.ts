import { Router } from 'express';
import { LeaderBoardController } from '../controller';

const controller = new LeaderBoardController();

export default class LeaderBoardRoute {
  constructor(public route = Router()) {
    this.route = route;

    this.route.get(
      '/',
      (req, res, next) => controller.generalClassification(req, res, next),
    );

    this.route.get(
      '/home',
      (req, res, next) => controller.homeClassification(req, res, next),
    );
    this.route.get(
      '/away',
      (req, res, next) => controller.awayClassification(req, res, next),
    );
  }
}
