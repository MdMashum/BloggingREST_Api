const AuthorModel= require("../models/authorModel")
const jwt = require("jsonwebtoken")



//CREATE AUTHOR
const createAuthor= async function (req, res) {
   try{ let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({data: authorCreated})
}catch (err) {
    res.status(500).send({ ERROR: err.message });
  }

}


//AUTHOR-LOGIN
const authorLogin = async function (req, res) {
 try{ let userName = req.body.email;
  let password = req.body.password;
  
  let SpecificAuther = await AuthorModel.findOne({ email: userName, password: password });

  if (!SpecificAuther)
    return res.status(404).send({
      status: false,
      msg: "username or the password is not corerct",
    });


  let token = jwt.sign(
    {
      userId:SpecificAuther._id.toString(),
      batch: "blogSite-phase2",
      organisation: "FunctionUp",
    },
    "blogSites-phase2"
  );

  res.status(201).send({ status: true, data: token });

}catch (err) {
  res.status(500).send({ ERROR: err.message });
}
}



module.exports.createAuthor= createAuthor;
module.exports.authorLogin = authorLogin;
