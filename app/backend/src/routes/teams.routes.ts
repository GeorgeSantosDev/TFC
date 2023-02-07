import { Router } from 'express';
import { TeamController } from '../controller';

const controller = new TeamController();

export default class TeamRoute {
  constructor(public route = Router()) {
    this.route = route;

    this.route.get(
      '/',
      (req, res, next) => controller.getAll(req, res, next),
    );

    this.route.get(
      '/:id',
      (req, res, next) => controller.getById(req, res, next),
    );
  }
}
