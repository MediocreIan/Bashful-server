const path = require("path");
const express = require("express");
const xss = require("xss");
const outputServices = require("./output-services");

const outputRouter = express.Router();
const jsonParser = express.json();

outputRouter.route("/:scriptId").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  outputServices
    .getById(req.app.get("db"), req.params.scriptId)
    .then((data) => {
      return outputServices.generateScriptString(data);
    })
    .then((string) => {
      res.send(200, JSON.stringify(string));
    })
    .catch(next);
});

module.exports = outputRouter;
