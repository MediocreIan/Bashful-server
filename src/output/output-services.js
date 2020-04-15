const outputServices = {
  generateScriptString(scriptArray) {
    let scriptString = "";
    scriptArray.forEach((script) => {
      if (script.type === "command") {
        scriptString += `\n ${script.command}`;
      }
      if (script.type === "If") {
        scriptString += `\n if [${script.condition}]; then \n ${script.command} fi`;
      }
      if (script.type === "for") {
        scriptString += `\n for i in {1..${script.duration}}\n do \n ${script.command} \n done`;
      }
      console.log(scriptString);
    });
    return scriptString;
  },

  getById(knex, scriptId) {
    return knex
      .from("script_data")
      .select("*")
      .where("script_relation", scriptId);
  },
};

module.exports = outputServices;
