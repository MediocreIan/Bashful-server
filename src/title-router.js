const path = require("path");
const express = require("express");
const xss = require("xss");
const TitleServices = require("./title-services.js");
const { requireAuth } = require("./middleware/jwt-auth");

const titleRouter = express.Router();
const jsonParser = express.json();

titleRouter.route("/").post(requireAuth, jsonParser, (req, res, next) => {
  const { title } = req.body;
  const newScript = { title };

  for (const [key, value] of Object.entries(newScript))
    if (value == null)
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
  newScript.title = title;
  newScript.user_id = req.user.id;
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
