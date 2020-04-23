const knex = require("knex");
const app = require("../src/app");

describe("output endpoints", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    console.log(process.env.TEST_DATABASE_URL);
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw("TRUNCATE script_data, script_titles RESTART IDENTITY CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE script_data, script_titles RESTART IDENTITY CASCADE")
  );

  describe("GET /output/scriptId", () => {
    context("given script exists", () => {
      it("responds with 200 and concatenatedd script", () => {
        return supertest(app).get("/output/1").expect(200);
      });
    });
  });
});
