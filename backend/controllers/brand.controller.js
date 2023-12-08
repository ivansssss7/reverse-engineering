const { validationResult } = require("express-validator");
const BrandModel = require("../models/brand.model");

class Brand {
    async create(req, res) {
        const errors = validationResult(req);
        const { name } = req.body;
        if (errors.isEmpty()) {
            const exist = await BrandModel.findOne({ name });
            if (!exist) {
                await BrandModel.create({ name });
                return res.status(201).json({ message:"Your brand has been created successfully" });
            } else {
                return res.status(400).json({ errors: [{ msg: `${name} is already exist` }] });
            }
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
    async brands(req, res) {
        const page = req.query.page;
        if (!page) {
          return Brand.allBrands(req, res);
        }

        const perPage = 3;
        const skip = (page - 1) * perPage;
        try {
            const count = await BrandModel.find({}).countDocuments();
            const response = await BrandModel.find({})
                .skip(skip)
                .limit(perPage)
                .sort({ updatedAt: -1 });
            console.log(response);
            return res.status(200).json({ brands: response, perPage, count });
        } catch (error) {
            console.log(error.message);
        }
    }
    async fetchBrand(req, res) {
        const { id } = req.params;
        try {
            const response = await BrandModel.findOne({ _id: id });
            console.log("controller response : ", response);
            return res.status(200).json({ brand: response });
        } catch (error) {
            console.log(error.message);
        }
    }
    async updateBrand(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const exist = await BrandModel.findOne({ name });
            if (!exist) {
                const response = await BrandModel.updateOne({ _id: id }, { $set: { name }});
                return res.status(200).json({ message: "Your brand has been updated successfully" });
            } else {
                return res.status(400).json({ errors: [{ msg: `${name} is already exist` }] });
            }
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
    async deleteBrand(req, res) {
        const { id } = req.params;
        try {
            await BrandModel.deleteOne({ _id: id });
            return res.status(200).json({ message: "Brand has been deleted successfully" });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("server internal error");
        }
    }
    static async allBrands(req, res) {
        try {
            const brands = await BrandModel.find({});
            return res.status(200).json({ brands })
        } catch (error) {
            return res.status(500).json("server internal error");
        }
    }
}

module.exports = new Brand;
