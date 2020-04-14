const path = require("path");
const express = require("express");
const xss = require("xss");
const TitleServices = require("./title-services.js");

const titleRouter = express.Router();
const jsonParser = express.json();

titleRouter.route("/").post(jsonParser, (req, res, next) => {
  const { title } = req.body;
  const newScript = { title };

  for (const [key, value] of Object.entries(newScript))
    if (value == null)
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
  newScript.title = title;
  TitleServices.insertTitle(req.app.get("db"), newScript)
    .then((title) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${title.id}`))
        .json(title);
    })
    .catch(next);
});
module.exports = titleRouter;
