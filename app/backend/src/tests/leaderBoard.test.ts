import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches.model';
import Team from '../database/models/team.model';
import { allTeams, allMatches, leadearBoardAway, leadearBoardGeneral, leadearBoardHome } from './mocks/leaderBoard.mocks';

import { IMatches, ITeam } from '../interfaces';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test leaderboard path', () => {

  describe('Test if is possible get classification for home', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(allMatches as IMatches[] | any );
      sinon
        .stub(Team, "findAll")
        .resolves(allTeams as ITeam[] | any);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('should return home classification as Response and status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

      const { body, status } = chaiHttpResponse;

      expect(body).to.deep.equal(leadearBoardHome);
      expect(status).to.be.equal(200);
    });
  });

  describe('Test if is possible get classification for away', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(allMatches as IMatches[] | any );
      sinon
        .stub(Team, "findAll")
        .resolves(allTeams as ITeam[] | any);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('should return away classification as Response and status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

      const { body, status } = chaiHttpResponse;

      expect(body).to.deep.equal(leadearBoardAway);
      expect(status).to.be.equal(200);
    });
  });

  describe('Test if is possible get general classification', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(allMatches as IMatches[] | any );
      sinon
        .stub(Team, "findAll")
        .resolves(allTeams as ITeam[] | any);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('should return general classification as Response and status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard');

      const { body, status } = chaiHttpResponse;

      expect(body).to.deep.equal(leadearBoardGeneral);
      expect(status).to.be.equal(200);
    });
  });

});
