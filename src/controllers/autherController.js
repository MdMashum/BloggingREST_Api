let autherModels = require("../models/autherModel")

let createAuther = async function(req,res){
    let body = req.body;
    const createAuther = await autherModels.create(body);

    res.status(201).send({data: createAuther})
}









module.exports.createAuther = createAuther;