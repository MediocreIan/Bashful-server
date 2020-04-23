const knex = require("knex");
const app = require("../src/app");
const helpers = require("./helpers");

describe("input Endpoints", function () {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });
  const commands = [
    {
      command_name: "echo",
      description:
        'this command prints the text of a file to the bash terminal, youll need to specify the path of a file to use it (see below on how to find filepaths). This command will also print out whatever argument you give below if its in quotes e.g. "hello, World!"',
      extra_field: true,
    },
    {
      command_name: "touch",
      description:
        "this allows you to create a file in whatever folder you're currently in. You will need to enter a filename after this. (including the folder you want the file to be in. See more about file paths below.)",
      extra_field: true,
    },
    {
      command_name: "mkdir",
      description:
        "this allows you to make a folder inside whatever folder you're currently in (change folders with cd). dont forget to specify a folder name",
      extra_field: true,
    },
    {
      command_name: "mv",
      description:
        "this command menas move but it actually lets you move OR rename files, youll need to enter two file pathes (see below on how to find filepaths), first the file you want to move, then where you want to move it to OR what you want to rename it to",
      extra_field: true,
    },
    {
      command_name: "rmdir",
      description:
        "this will delete whatever folder you want enter in the next box, this function only deletes empty folders though",
      extra_field: true,
    },
    {
      command_name: "cp",
      description:
        "this will copy one a file, you'll need to specify two file pathes (see below on how to find filepaths), first the file you want to copy, then where you want to copy it to.",
      extra_field: true,
    },
    {
      command_name: "rm",
      description:
        "this will delete whatever file is at the file path you pass it (see below on how to find filepaths), BE CAREFUL. this command can dlete important files that make your computer run if you arent careful. ",
      extra_field: true,
    },
  ];

  const testUser = {
    user_name: "TEST1",
    password: "Password1234!",
    full_name: "test1",
  };

  const testScriptTitle = {
    title: "test",
    author_id: 1,
  };

  const scriptData = {
    arg1: "test",
    command: "echo",
    description:
      'this command prints the text of a file to the bash terminal, youll need to specify the path of a file to use it (see below on how to find filepaths). This command will also print out whatever argument you give below if its in quotes e.g. "hello, World!"',
    script_relation: 1,
    type: "command",
  };

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe("GET input/commands", () => {
    it(" responds with 200 and all of the commands", () => {
      return supertest(app).get("/input/commands").expect(200, commands);
    });
  });

  describe.only("GET input/:scriptId", () => {
    beforeEach("insert test users, test tiles and test data", () => {
      return helpers.seedTables(
        db,
        [testUser],
        [testScriptTitle],
        [scriptData]
      );
    });
    it("responds with 200 and all lines", () => {
      return supertest(app).get("/input/1").expect(200, [scriptData]);
    });
  });
});
