const { validationResult } = require("express-validator");
const SparePartModel = require("../models/spare-part.model");

class SparePart {
    async create(req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            await SparePartModel.create(req.body);
            return res.status(201).json({ message:"Spare part has been created successfully" });
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
    async getAll(req, res) {
        const page = req.query.page || 1;

        const perPage = 10;
        const skip = (page - 1) * perPage;
        try {
            const count = await SparePartModel.find({}).countDocuments();
            const response = await SparePartModel.find({})
                .skip(skip)
                .limit(perPage)
                .sort({ updatedAt: -1 });
            console.log(response);
            return res.status(200).json({ spareParts: response, perPage, count });
        } catch (error) {
            console.error(error.message);
        }
    }
    async getById(req, res) {
        const { id } = req.params;
        try {
            const response = await SparePartModel
                .findOne({ _id: id })
                .populate("modelId", "_id model");
            console.log("controller response: ", response);
            return res.status(200).json({ sparePart: response });
        } catch (error) {
            console.error(error.message);
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const response = await SparePartModel.updateOne({ _id: id }, { $set: req.body});
            return res.status(200).json({ message: "Spare part has been updated successfully" });
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            await SparePartModel.deleteOne({ _id: id });
            return res.status(200).json({ message: "Brand has been deleted successfully" });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json("server internal error");
        }
    }
}

module.exports = new SparePart;
