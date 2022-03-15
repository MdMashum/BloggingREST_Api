const AuthorModel= require("../models/authorModel")
// 1 st API to create Author
const createAuthor= async function (req, res) {
   try{ let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({data: authorCreated})
}catch (err) {
    res.status(500).send({ ERROR: err.message });
  }

}



module.exports.createAuthor= createAuthor