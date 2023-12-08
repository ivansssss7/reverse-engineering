const express = require("express");
const router = express.Router();
const SparePart = require("../controllers/spare-part.controller");
const Authorization = require("../services/Authorization");

router.post("/", Authorization.authorized, SparePart.create);
router.get("/", Authorization.authorized,  SparePart.getAll);
router.get("/:id", Authorization.authorized, SparePart.getById);
router.put("/:id", Authorization.authorized, SparePart.update);
router.delete("/:id", Authorization.authorized, SparePart.delete);

module.exports = router;
