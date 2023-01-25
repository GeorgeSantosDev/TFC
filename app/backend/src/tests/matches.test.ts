import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches.model';
import User from '../database/models/user.model';
import { user, loginBody } from './mocks/user.mocks';
import {
  matchesInProgressTrue,
  matchesInProgressFalse,
  postResponse,
  postBody,
  postBodySameTeam,
  postBodyTeamDoesNotExist,
  invalidToken,
  updateGoals
} from './mocks/matches.mocks';

import IMatches, { IPostBodyMatch } from '../interfaces/IMatches'
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test matches path', () => {

  describe('Test if is possible getAll matches', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(matchesInProgressTrue as IMatches[] | any);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('should return all teams as Response and status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');

      const { body, status } = chaiHttpResponse;

      expect(body).to.have.length(2);
      expect(body[0].homeTeam).to.have.property('teamName');
      expect(body[0]).to.have.property('id');
      expect(status).to.be.equal(200);
    });
  });

  describe('Test if is possible get matches in progress', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(matchesInProgressTrue as IMatches[] | any);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('should return all teams with inProgress true as Response and status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');

      const { body, status } = chaiHttpResponse;

      expect(body).to.have.length(2);
      expect(body[0].inProgress).to.be.true;
      expect(body[1].inProgress).to.be.true;
      expect(status).to.be.equal(200);
    });
  });

  describe('Test if is possible get matches not in progress', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(matchesInProgressFalse as IMatches[] | any);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('should return all teams with inProgress false as Response and status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');

      const { body, status } = chaiHttpResponse;

      expect(body).to.have.length(2);
      expect(body[0].inProgress).to.be.false;
      expect(body[1].inProgress).to.be.false;
      expect(status).to.be.equal(200);
    });
  });

  describe('Test if is possible create new match', () => {
    let chaiHttpResponse: Response;
    let chaiHttpResponse2: Response;

    before(async () => {
      sinon
        .stub(Matches, "create")
        .resolves(postResponse as IPostBodyMatch | any);
      sinon
        .stub(User, "findOne")
        .resolves(user as User);
    });

    after(() => {
      (Matches.create as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return a object of Macth as Response and status 201', async () => {
      chaiHttpResponse2 = await chai.request(app).post('/login').send(loginBody);
      const { body: { token } } = chaiHttpResponse2;
      chaiHttpResponse = await chai.request(app).post('/matches').send(postBody).set({ Authorization: token });

      const { body, status } = chaiHttpResponse;

      expect(status).to.be.equal(201);
      expect(body.inProgress).to.be.true;
      expect(body).to.have.property('id');
    });
  });

  describe('Test validations for create new Match', () => {
    let chaiHttpResponse: Response;
    let chaiHttpResponse2: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(user as User);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return a message It is not possible to create a match with two equal teams /\
     and status 422', async () => {
      chaiHttpResponse2 = await chai.request(app).post('/login').send(loginBody);
      const { body: { token } } = chaiHttpResponse2;

      chaiHttpResponse = await chai.request(app).post('/matches').send(postBodySameTeam).set({ Authorization: token });

      const { body, status } = chaiHttpResponse;
      expect(status).to.be.equal(422);
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('It is not possible to create a match with two equal teams');
    });

    it('should return a message There is no team with such id! and status 422', async () => {
      chaiHttpResponse2 = await chai.request(app).post('/login').send(loginBody);
      const { body: { token } } = chaiHttpResponse2;
      chaiHttpResponse = await chai.request(app).post('/matches').send(postBodyTeamDoesNotExist).set({ Authorization: token });

      const { body, status } = chaiHttpResponse;

      expect(status).to.be.equal(404);
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('There is no team with such id!');
    });

    it('should return a message Token must be a valid token and status 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/matches').send(postBodyTeamDoesNotExist).set({ Authorization: invalidToken });

      const { body, status } = chaiHttpResponse;

      expect(status).to.be.equal(401);
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Token must be a valid token');
    });

  });

  describe('Test if is possible update a match', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "update")
        .resolves([1]);
    });

    after(() => {
      (Matches.update as sinon.SinonStub).restore();
    })

    it('should return a message Finished and status 200', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

      const { body, status } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Finished');
    });
  });

  describe('Test if is possible update a match', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "update")
        .resolves([1]);
    });

    after(() => {
      (Matches.update as sinon.SinonStub).restore();
    })

    it('should return a message Scoreboard was updated! and status 200', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/1').send(updateGoals);
  
      const { body, status } = chaiHttpResponse;
  
      expect(status).to.be.equal(200);
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Scoreboard was updated!');
    });
  });
});
