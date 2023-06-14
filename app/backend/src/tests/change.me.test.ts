import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('integration of route teams', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');

    const chaiHttpResponse2 = await chai
      .request(app)
      .get('/teams/1');
    
    expect(chaiHttpResponse2.status).to.be.equal(200);
    expect(chaiHttpResponse2.body).to.be.an('object');

    const chaiHttpResponse3 = await chai
      .request(app)
      .get('/teams/999');

    expect(chaiHttpResponse3.status).to.be.equal(404);
    expect(chaiHttpResponse3.body).to.deep.equal({message: 'Team not found'});
  });

});
