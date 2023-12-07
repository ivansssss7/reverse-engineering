const express = require("express");
const { registerValidations, loginValidations} = require("../validations/user.validation");
const { register, login} = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);


module.exports = router;
