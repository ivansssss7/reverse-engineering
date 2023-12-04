const express = require("express");
const router = new express.Router();
const Model = require("../controllers/Model");
const Authorization = require("../services/Authorization");
const modelValidations = require("../validations/modelValidations");
router.post("/create-model",[Authorization.authorized, modelValidations], Model.create);
module.exports = router;