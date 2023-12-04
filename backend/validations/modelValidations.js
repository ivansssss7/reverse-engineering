const {body} = require("express-validator");
module.exports = [
    body("brands").not().isEmpty().trim().escape().withMessage("Brand is required"),
    body("model").not().isEmpty().trim().escape().withMessage("Model is required"),
    body("year").not().isEmpty().trim().escape().withMessage("Year is required"),
    body("body").not().isEmpty().trim().escape().withMessage("body is required"),
    body("engine").not().isEmpty().trim().escape().withMessage("Engine is required"),
    body("power").not().isEmpty().trim().escape().withMessage("Power is required"),]