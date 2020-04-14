const path = require("path");
const express = require("express");
const xss = require("xss");
const outputServices = require("./output-services");

const ScriptOptionsRouter = express.Router();
const jsonParser = express.json();
