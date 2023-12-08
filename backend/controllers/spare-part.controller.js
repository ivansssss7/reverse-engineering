const { validationResult } = require("express-validator");
const {v4: uuidv4} = require("uuid")
const formidable = require('formidable');
const fs = require("fs");
const path = require("path")
const SparePartModel = require("../models/spare-part.model");
const sparePartModel = require("../models/spare-part.model");

class SparePart {
    async create(req, res) {
        const form = formidable({ multiples: true });
        console.log(__dirname);
        form.parse(req, async(err, fields, files)=>{
            if(!err){
                const parsedData = JSON.parse(fields.data);
                console.log(parsedData);
                const errors = [];
                if (parsedData.modelId.length === 0) {
                  errors.push({ msg: "car is required" });
                }
                if (parsedData.system.trim().length === 0) {
                  errors.push({ msg: "system is required" });
                }
                if (parsedData.name.trim().length === 0) {
                  errors.push({ msg: "name is required" });
                }
                if (parsedData.specification.trim().length === 0) {
                  errors.push({ msg: "specification is required" });
                }
                if (parsedData.manufacturer.trim().length === 0) {
                  errors.push({ msg: "manufacturer is required" });
                }
                if (parsedData.country.trim().length === 0) {
                    errors.push({ msg: "country is required" });
                }
                if (parseInt(parsedData.price)<1 ) {
                    errors.push({ msg: "price should be above 1$" });
                }
                if (parseInt(parsedData.discount)<0 ) {
                    errors.push({ msg: "discount should not be negative" });
                }
                if (parseInt(parsedData.quantity)<0 ) {
                    errors.push({ msg: "quantity should be positive" });
                }
                if (errors.length===0) {
                    if (!files["photo"]) {
                        errors.push({msg:"photo is required"})
                    }
                    if (errors.length === 0) {
                        const images = {};
                        for (let i = 0; i < Object.keys(files).length; i++) {
                          const mimeType = files[`photo`].mimetype;
                          const extension = mimeType.split("/")[1].toLowerCase();
                          if (
                            extension === "jpeg" ||
                            extension === "jpg" ||
                            extension === "png"
                          ) {
                            const imageName = uuidv4() + `.${extension}`;
                            const __dirname = path.resolve();
                            const newPath =
                              __dirname + `/../client/public/images/${imageName}`;
                            images[`photo`] = imageName;
                            fs.copyFile(files[`photo`].filepath, newPath, (err) => {
                              if (err) {
                                console.log(err);
                              }
                            });
                          } else {
                            const error = {};
                            error["msg"] = `photo has invalid ${extension} type`;
                            errors.push(error);
                          }
                        }
                        if(errors.length===0){
                            try {
                                const response = await sparePartModel.create({
                                    modelId:parsedData.modelId,
                                    system:parsedData.system,
                                    name:parsedData.name,
                                    manufacturer:parsedData.manufacturer,
                                    specification:parsedData.specification,
                                    country:parsedData.country,
                                    price:parseInt(parsedData.price),
                                    quantity:parseInt(parsedData.quantity),
                                    discount:parseInt(parsedData.discount),
                                    picture:images["photo"]
                                })
                                return res.status(201).json({msg:"Product has created", response})
                            } catch (error) {
                                console.log(error);
                                res.status(500).json(error)
                            }
                        }else{
                            return res.status(400).json({errors})
                        }
                        
                    } else {
                        return res.status(400).json({errors})
                    }

                }
                else{
                    return res.status(400).json({errors})
                }
            }
        })
        // const errors = validationResult(req);
        // if (errors.isEmpty()) {
        //     await SparePartModel.create(req.body);
        //     return res.status(201).json({ message:"Spare part has been created successfully" });
        // } else {
        //     return res.status(400).json({ errors: errors.array() });
        // }
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
