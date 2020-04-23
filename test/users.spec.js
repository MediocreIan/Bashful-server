const knex = require("knex");
const app = require("../src/app");
const helpers = require("./helpers.js");

describe("users endpoints", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw(
      "TRUNCATE script_data, script_titles, bashful_users RESTART IDENTITY CASCADE"
    )
  );

  afterEach("cleanup", () =>
    db.raw(
      "TRUNCATE script_data, script_titles, bashful_users RESTART IDENTITY CASCADE"
    )
  );

  const testUser = {
    user_name: "TEST1",
    password: "Password1234!",
    full_name: "test1",
  };

  const testScriptTitle = {
    title: "test",
    author_id: "1",
  };

  describe("POST users/ endpoint", () => {
    it("returns 201 and user info when given valid data", () => {
      return supertest(app)
        .post("/users")
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.id).to.eql(1);
          expect(res.body.user_name).to.eql(testUser.user_name);
          expect(res.body.full_name).to.eql(testUser.full_name);
        });
    });
  });

  describe("Get users/:userId", () => {
    context("given no titles", () => {
      it("responds with 200 and an empty array", () => {
        return supertest(app).get("/users/1").expect(200, []);
      });
    });
    context("given titles with given id", () => {
      beforeEach("insert user and scripts", () => {
        helpers.seedScriptTitlesTable(db, [testUser], [testScriptTitle]);
      });
      it("responds with 200 and the scripts ", () => {
        supertest(app).get("/users/1").expect(200);
      });
    });
  });
});
