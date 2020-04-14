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
    const { activeScripts } = req.body;
    // for (const [key, value] of Object.entries(activeScripts[i]))
    //   if (value == null)
    //     return res.status(400).json({
    //       error: { message: `missing ${key} in request body` },
    //     });

    InputServices.insertScriptData(req.app.get("db"), activeScripts)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(next);
  });

module.exports = ScriptOptionsRouter;
