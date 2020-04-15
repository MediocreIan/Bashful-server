const script_optionsService = {
  getAllscript_options(knex) {
    return knex.select("*").from("script_options");
  },
  getAllCommands(knex) {
    return knex.select("*").from("command_options");
  },
  insertScriptData(knex, newScript) {
    return knex
      .insert(newScript)
      .into("script_data")
      .returning("*")
      .then((rows) => {
        return rows;
      });
  },
  insertScript(knex, newScript) {
    return knex
      .insert(newScript)
      .into("script_titles")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex.from("script_options").select("*").where("id", id).first();
  },

  deleteScript(knex, id) {
    return knex("script_options").where({ id }).delete();
  },
  updateScript(knex, id, newScriptFields) {
    return knex("script_options").where({ id }).update(newScriptFields);
  },
};

module.exports = script_optionsService;
