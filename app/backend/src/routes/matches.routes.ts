import { Router } from 'express';
import { MacthesController } from '../controller';
import MatchesValidations from '../middlewares/CreateMacthValidations';

const controller = new MacthesController();
const validation = new MatchesValidations();

export default class MatchesRoute {
  constructor(public route = Router()) {
    this.route = route;

    this.route.get(
      '/',
      (req, res, next) => controller.getAllMatches(req, res, next),
    );

    this.route.post(
      '/',
      (req, res, next) => validation.validateTeams(req, res, next),
      (req, res, next) => controller.createMatch(req, res, next),
    );

    this.route.patch(
      '/:id/finish',
      (req, res, next) => controller.updateProgress(req, res, next),
    );

    this.route.patch(
      '/:id',
      (req, res, next) => controller.updateGoals(req, res, next),
    );
  }
}
