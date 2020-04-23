const bcrypt = require("bcryptjs");

function seedScriptTitlesTable(db, user, ScriptTitles) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await trx.into("bashful_users").insert(user);
    await trx.into("script_titles").insert(ScriptTitles);
    // update the auto sequence to match the forced id values
    await Promise.all([
      trx.raw(`SELECT setval('bashful_users_id_seq', ?)`, 1),
      trx.raw(`SELECT setval('script_titles_id_seq', ?)`, 1),
    ]);
  });
}
function seedScriptDataTable(db, scriptData) {
  return db.transaction(async (trx) => {
    await trx.into("script_data").insert(scriptData);
    // update the auto sequence to match the forced id values
    await Promise.all([trx.raw(`SELECT setval('script_data_id_seq', ?)`, 1)]);
  });
}

function seedTables(db, user, ScriptTitles, scriptData) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await trx.into("bashful_users").insert(user);
    await trx.into("script_titles").insert(ScriptTitles);
    await trx.into("script_data").insert(scriptData);
    // update the auto sequence to match the forced id values
    await Promise.all([
      trx.raw(`SELECT setval('bashful_users_id_seq', ?)`, 1),
      trx.raw(`SELECT setval('script_titles_id_seq', ?)`, 1),
      trx.raw(`SELECT setval('script_data_id_seq', ?)`, 1),
    ]);
  });
}

function seedScriptDataTable(db, scriptData) {
  return db.transaction(async (trx) => {
    await trx.into("script_data").insert(scriptData);
    // update the auto sequence to match the forced id values
    await Promise.all([trx.raw(`SELECT setval('script_data_id_seq', ?)`, 1)]);
  });
}
function seedUsers(db, user) {
  const preppedUsers = {
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  };
  return db
    .into("bashful_users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('bashful_users_id_seq', ?)`, 1)
    );
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
        script_titles,
        bashful_users,
        script_data
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(
            `ALTER SEQUENCE script_titles_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE bashful_users_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`ALTER SEQUENCE script_data_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('script_titles_id_seq', 0)`),
          trx.raw(`SELECT setval('bashful_users_id_seq', 0)`),
          trx.raw(`SELECT setval('script_data_id_seq', 0)`),
        ])
      )
  );
}

module.exports = {
  seedScriptTitlesTable,
  seedUsers,
  cleanTables,
  seedScriptDataTable,
  seedTables,
};
