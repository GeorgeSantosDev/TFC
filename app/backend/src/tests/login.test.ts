import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user.model';
import {
  loginBody,
  user,
  loginBodyNoEmail,
  loginBodyNoPassword,
  loginBodyInvalidEmail,
  loginBodyInvalidPassword
} from './mocks/user.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test login path', () => {

  describe('Test if is possible log in', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(user as User);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return a token as Response and status 200', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginBody);

      const { body, status } = chaiHttpResponse;

      expect(body).to.have.property('token');
      expect(status).to.be.equal(200);
    });
  });

  describe('Test if is not possible log in without email and password field', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(null);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return status 400 and errro message when do not have email field', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginBodyNoEmail);
      const { body, status } = chaiHttpResponse;

      expect(body.message).to.be.equal('All fields must be filled');
      expect(status).to.be.equal(400);
    });

    it('should return status 400 and errro message when do not have password field', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginBodyNoPassword);
      const { body, status } = chaiHttpResponse;

      expect(body.message).to.be.equal('All fields must be filled');
      expect(status).to.be.equal(400);
    });
  });

  describe('Test if is not possible log in with invalid email or password ', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(null);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return status 401 and error message when have an invalid email field', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginBodyInvalidEmail);
      const { body, status } = chaiHttpResponse;

      expect(body.message).to.be.equal('Incorrect email or password');
      expect(status).to.be.equal(401);
    });

    it('should return status 401 and error message when have an invalid password field', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginBodyInvalidPassword);
      const { body, status } = chaiHttpResponse;

      expect(body.message).to.be.equal('Incorrect email or password');
      expect(status).to.be.equal(401);
    });
  });

  describe('Test if login/validate return correctly the user role', () => {
    let chaiHttpResponse: Response;

    it('should return status 200 and message { role: userRole }', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6IkFkbWluIn0sImlhdCI6MTY3NDUwMDQ0NCwiZXhwIjoxNjc0NTA0MDQ0fQ.qlCMhygOp2QNG_C2lPYqXcEpaAxeTvRENrf5kvAQhWI'
      chaiHttpResponse = await chai.request(app).get('/login/validate').set({ Authorization:  token});
      const { body, status } = chaiHttpResponse;

      expect(body).to.have.property('role');
      expect(status).to.be.equal(200);
    });
  });
});
