const formidable = require("formidable");
const {validationResult} = require("express-validator");
class Model {
    async create(req, res){
        const form = formidable({multiples:true});
        form.parse(req, (err, fields)=>{
            if(!err){
                const parsedData = JSON.parse(fields.data);
                req.body.brands = parsedData.brands;
                req.body.model = parsedData.model;
                req.body.year = parsedData.year;
                req.body.body = parsedData.body;
                req.body.engine = parsedData.engine;
                req.body.power = parsedData.power;
                const errors = validationResult(req);
                if(!errors){

                }else{
                    console.log(errors.array());
                    return res.status(400).json({errors:errors.array()})
                }
            }
        })
    }
}
module.exports = new Model;