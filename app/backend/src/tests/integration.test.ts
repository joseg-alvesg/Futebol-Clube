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

  it("integration of route login/role", async function () {
    const chaiHttpResponse = await chai.request(app).post("/login").send({
      email: "admin@admin.com",
      password: "secret_admin",
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an("object");
    expect(chaiHttpResponse.body).to.have.property("token");

    const chaiHttpResponse2 = await chai
      .request(app)
      .get("/login/role")
      .set("Authorization", `${chaiHttpResponse.body.token}`)
      .send();

    expect(chaiHttpResponse2.status).to.be.equal(200);
    expect(chaiHttpResponse2.body).to.be.an("object");
    expect(chaiHttpResponse2.body).to.have.property("role");
    expect(chaiHttpResponse2.body.role).to.be.equal("admin");

    const chaiHttpResponse3 = await chai
      .request(app)
      .get("/login/role")
      .set("Authorization", ``)
      .send();

    expect(chaiHttpResponse3.status).to.be.equal(401);
    expect(chaiHttpResponse3.body).to.be.an("object");
    expect(chaiHttpResponse3.body).to.have.property("message");
    expect(chaiHttpResponse3.body.message).to.be.equal("Token not found");

    const chaiHttpResponse4 = await chai
      .request(app)
      .get("/login/role")
      .set("Authorization", `token`)
      .send();

    expect(chaiHttpResponse4.status).to.be.equal(401);
    expect(chaiHttpResponse4.body).to.be.an("object");
    expect(chaiHttpResponse4.body).to.have.property("message");
    expect(chaiHttpResponse4.body.message).to.be.equal(
      "Token must be a valid token"
    );
  });

  it("integration of route matches", async function () {
    const chaiHttpResponse = await chai.request(app).post("/login").send({
      email: "admin@admin.com",
      password: "secret_admin",
    });

    const chaiHttpResponse2 = await chai
      .request(app)
      .get("/matches")
      .set("Authorization", `${chaiHttpResponse.body.token}`)
      .send();

    expect(chaiHttpResponse2.status).to.be.equal(200);
    expect(chaiHttpResponse2.body).to.be.an("array");
    
    const chaiHttpResponse3 = await chai
      .request(app)
      .patch("/matches/1")
      .set("Authorization", `${chaiHttpResponse.body.token}`)
      .send({
        homeTeamGoals: 1,
        awayTeamGoals: 1,
      });

    expect(chaiHttpResponse3.status).to.be.equal(200);
    expect(chaiHttpResponse3.body).to.be.an("object");
    expect(chaiHttpResponse3.body).to.have.property("message");
    expect(chaiHttpResponse3.body.message).to.be.equal("Goals updated");


    const chaiHttpResponse4 = await chai
      .request(app)
      .patch("/matches/1/finish")
      .set("Authorization", `${chaiHttpResponse.body.token}`)
      .send();

    expect(chaiHttpResponse4.status).to.be.equal(200);
    expect(chaiHttpResponse4.body).to.be.an("object");
    expect(chaiHttpResponse4.body).to.have.property("message");
    expect(chaiHttpResponse4.body.message).to.be.equal("Finished");
      
  const chaiHttpResponse5 = await chai
      .request(app)
      .post("/matches")
      .set("Authorization", `${chaiHttpResponse.body.token}`)
      .send({
        homeTeamId: 1,
        awayTeamId: 2,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
      });

    expect(chaiHttpResponse5.status).to.be.equal(201);
    expect(chaiHttpResponse5.body).to.be.an("object");
    expect(chaiHttpResponse5.body).to.have.property("id");
    expect(chaiHttpResponse5.body).to.have.property("homeTeamId");
    expect(chaiHttpResponse5.body).to.have.property("awayTeamId");
    expect(chaiHttpResponse5.body).to.have.property("homeTeamGoals");
    expect(chaiHttpResponse5.body).to.have.property("awayTeamGoals");
    expect(chaiHttpResponse5.body).to.have.property("inProgress");

    const chaiHttpResponse6 = await chai
      .request(app)
      .post("/matches")
      .set("Authorization", `${chaiHttpResponse.body.token}`)
      .send({
        homeTeamId: 1,
        awayTeamId: 1,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
      });

    expect(chaiHttpResponse6.status).to.be.equal(422);
    expect(chaiHttpResponse6.body).to.be.an("object");
    expect(chaiHttpResponse6.body).to.have.property("message");
    expect(chaiHttpResponse6.body.message).to.be.equal("It is not possible to create a match with two equal teams");

    const chaiHttpResponse7 = await chai
      .request(app)
      .post("/matches")
      .set("Authorization", `${chaiHttpResponse.body.token}`)
      .send({
        homeTeamId: 1,
        awayTeamId: 999,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
      });

    expect(chaiHttpResponse7.status).to.be.equal(404);
    expect(chaiHttpResponse7.body).to.be.an("object");
    expect(chaiHttpResponse7.body).to.have.property("message");
    expect(chaiHttpResponse7.body.message).to.be.equal("There is no team with such id!");

    const chaiHttpResponse8 = await chai
      .request(app)
      .get("/matches")
      .query({ inProgress: true })
      .send();

    expect(chaiHttpResponse8.status).to.be.equal(200);
    expect(chaiHttpResponse8.body).to.be.an("array");
  })
});
