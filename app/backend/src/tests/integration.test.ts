import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { App, app } from "../app";
import Example from "../database/models/ExampleModel";

import { Response } from "superagent";
import { start } from "repl";
import { request } from "http";

chai.use(chaiHttp);

const { expect } = chai;

describe("Seu teste", () => {
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

  it("integration of route teams", async () => {
    const chaiHttpResponse = await chai.request(app).get("/teams");

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an("array");

    const chaiHttpResponse2 = await chai.request(app).get("/teams/1");

    expect(chaiHttpResponse2.status).to.be.equal(200);
    expect(chaiHttpResponse2.body).to.be.an("object");

    const chaiHttpResponse3 = await chai.request(app).get("/teams/999");

    expect(chaiHttpResponse3.status).to.be.equal(404);
    expect(chaiHttpResponse3.body).to.deep.equal({ message: "Team not found" });
  });

  it("integration of route login", async function () {
    const chaiHttpResponse = await chai.request(app).post("/login").send({
      email: "admin@admin.com",
      password: "secret_admin",
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an("object");
    expect(chaiHttpResponse.body).to.have.property("token");

    const chaiHttpResponse2 = await chai.request(app).post("/login").send({
      email: "",
      password: "",
    });

    expect(chaiHttpResponse2.status).to.be.equal(400);
    expect(chaiHttpResponse2.body).to.be.an("object");
    expect(chaiHttpResponse2.body).to.have.property("message");
    expect(chaiHttpResponse2.body.message).to.be.equal(
      "All fields must be filled"
    );

    const chaiHttpResponse3 = await chai.request(app).post("/login").send({
      email: "@test.com",
      password: "secret_admin",
    });

    expect(chaiHttpResponse3.status).to.be.equal(401);
    expect(chaiHttpResponse3.body).to.be.an("object");
    expect(chaiHttpResponse3.body).to.have.property("message");
    expect(chaiHttpResponse3.body.message).to.be.equal(
      "Invalid email or password"
    );

    const chaiHttpResponse4 = await chai.request(app).post("/login").send({
      email: "admin@admi.com",
      password: "secret_admin",
    });

    expect(chaiHttpResponse4.status).to.be.equal(401);
    expect(chaiHttpResponse4.body).to.be.an("object");
    expect(chaiHttpResponse4.body).to.have.property("message");
    expect(chaiHttpResponse4.body.message).to.be.equal(
      "Invalid email or password"
    );

    const chaiHttpResponse5 = await chai.request(app).post("/login").send({
      email: "admin@admin.com",
      password: "secret",
    });

    expect(chaiHttpResponse5.status).to.be.equal(401);
    expect(chaiHttpResponse5.body).to.be.an("object");
    expect(chaiHttpResponse5.body).to.have.property("message");
    expect(chaiHttpResponse5.body.message).to.be.equal(
      "Invalid email or password"
    );
  });
});
