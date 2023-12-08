const express = require("express");
const router = new express.Router();
const Model = require("../controllers/model.controller");
const Authorization = require("../services/Authorization");

router.post("/", Authorization.authorized, Model.create);
router.get("/", Authorization.authorized, Model.getAll);

module.exports = router;
