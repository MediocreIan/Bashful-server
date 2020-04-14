const titleServices = {
  insertTitle(knex, newTitle) {
    return knex
      .insert(newTitle)
      .into("script_titles")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = titleServices;
