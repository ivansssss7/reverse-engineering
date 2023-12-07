const formidable = require('formidable');
const carModel = require("../models/car-model.model");
// const {validationResult} = require("express-validator");

class Model {
  create = async (req, res) => {
    // Your implementation for the create method
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields) => {
      if (!err) {
        // console.log("fields: ", fields);
        const parsedData = JSON.parse(fields.data);
        console.log(parsedData);
        // req.body.brandId = parsedData.brandId;
        // req.body.model = parsedData.model;
        // req.body.year = parsedData.year;
        // req.body.carBody = parsedData.carBody;
        // req.body.carEngine = parsedData.carEngine;
        // req.body.enginePower = parsedData.enginePower;
        // const errors = validationResult(req);
        const errors = [];
        const d = new Date();
        let currentYear = d.getFullYear();
        if (parsedData.brandId.trim().length === 0) {
          errors.push({ msg: "car brand is required" });
        }
        if (parsedData.model.trim().length === 0) {
          errors.push({ msg: "car model is required" });
        }
        if (
          parseInt(parsedData.year) < 1950 ||
          parseInt(parsedData.year) > currentYear
        ) {
          errors.push({
            msg: "year cannot be lower than 1950 or bigger than current",
          });
        }
        if (parsedData.carBody.trim().length === 0) {
          errors.push({ msg: "car body is required" });
        }
        if (parsedData.carEngine.trim().length === 0) {
          errors.push({ msg: "car engine is required" });
        }
        if (parsedData.enginePower.trim().length === 0) {
          errors.push({ msg: "engine power is required" });
        }
        if (errors.length === 0) {
          try {
            const response = await carModel.create({
              brandId: parsedData.brandId,
              model: parsedData.model,
              year: parsedData.year,
              carBody: parsedData.carBody,
              carEngine: parsedData.carEngine,
              enginePower: parsedData.enginePower,
            });
            return res.status(201).json({ msg: "Model has created", response });
          } catch (error) {
            console.log(error);
            return res.status(500).json(error);
          }
        } else {
          return res.status(400).json({ errors });
        }
        console.log("errors: ", errors);
      }
    });
  };

  async get(req, res) {
    const page = req.query.page || 1;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
      const count = await carModel.find({}).countDocuments();
      const response = await carModel
        .find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 })
        .populate("brandId", "_id name");
      console.log(response);
      return res.status(200).json({ models: response, perPage, count });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new Model();
