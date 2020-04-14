const titleServices = {
  insertTitle(knex, newTitle) {
    return knex
      .insert(newTitle)
      .into("Titles")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};
