const path = require("path");
const express = require("express");
const xss = require("xss");
const InputServices = require("./input-services");

const ScriptOptionsRouter = express.Router();
const jsonParser = express.json();

ScriptOptionsRouter.route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    InputServices.getAllscript_options(knexInstance)
      .then((scripts) => {
        return res.json(scripts);
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { lines } = req.body;
    // for (const [key, value] of Object.entries(lines[i]))
    //   if (value == null)
    //     return res.status(400).json({
    //       error: { message: `missing ${key} in request body` },
    //     });

    InputServices.insertScriptData(req.app.get("db"), lines)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(next);
  });

ScriptOptionsRouter.route("/commands").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  InputServices.getAllCommands(knexInstance)
    .then((commands) => {
      return res.json(commands);
    })
    .catch(next);
});

ScriptOptionsRouter.route("/:scriptId").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  InputServices.getByRelation(knexInstance, req.params.scriptId)
    .then((lines) => {
      return res.json(lines);
    })
    .catch(next);
});

module.exports = ScriptOptionsRouter;
