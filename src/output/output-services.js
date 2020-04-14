const outputServices = {
  generateScriptString(scriptArray) {
    let scriptString = "";
    scriptArray.map((script) => {
      if (script.type === "command") {
        scriptString.append(`\n ${script.command}`);
      }
      if (script.type === "if") {
        scriptString.append(`\n if [${condition}]; then \n ${command} fi`);
      }
      if (script.type === "for") {
        scriptString.append(
          `\n for i in {1..${duration}}\n do \n ${command} \n done`
        );
      }
      return scriptString;
    });
  },
};

module.exports = outputServices;
