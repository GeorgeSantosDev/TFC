import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team.model';
import User from '../database/models/user.model';
import { allTeams, team } from './mocks/team.mocks';
import { user, loginBody} from './mocks/user.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test team path', () => {

  describe('Test if is possible getAll teams', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(allTeams as Team[]);
    });

    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('should return all teams as Response and status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');

      const { body, status } = chaiHttpResponse;

      expect(body).to.have.length(3);
      expect(body[0]).to.have.property('teamName');
      expect(body[0]).to.have.property('id');
      expect(status).to.be.equal(200);
    });
  });

  describe('Test if is possible  get one team by id', () => {
    let chaiHttpResponse: Response;


    before(async () => {
      sinon
        .stub(Team, "findByPk")
        .resolves(team as Team);
    });

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('should return one team as Response and status 200', async () => {

      chaiHttpResponse = await chai.request(app).get('/teams/1');

      const { body, status } = chaiHttpResponse;

      expect(body).to.have.property('teamName');
      expect(body).to.have.property('id');
      expect(status).to.be.equal(200);
    });
  });


  describe('Test if is possible get one team that does not exist by id', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Team, "findByPk")
        .resolves(null);
    });

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('should return status 404 and message Team does not exist', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/15');

      const { body, status } = chaiHttpResponse;

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Team does not exist');
      expect(status).to.be.equal(404);
    });
  });
});
