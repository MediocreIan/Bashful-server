const knex = require("knex");
const app = require("../src/app");

describe("title endpoints", () => {
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

  describe("POST / endpoint", () => {
    const testTitle = {
      author_id: null,
      title: "test",
    };
    it("responds with 201 and the newly created tittle", () => {
      return supertest(app)
        .post("/")
        .send(testTitle)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.eql({
            id: 1,
            title: "test",
            author_id: null,
          });
        });
    });
  });
});
