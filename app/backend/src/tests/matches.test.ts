import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches.model';
import { matchesInProgressTrue, matchesInProgressFalse } from './mocks/matches.mocks';
import IMatches from '../interfaces/IMatches'
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

});
