const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")



//CREATE AUTHOR
const createAuthor = async function (req, res) {
  try {
    let author = req.body
    let authorCreated = await authorModel.create(author)
    return res.status(201).send({ AuthorDetails : authorCreated })
  } catch (err) {
    return res.status(500).send({ ERROR: err.message });
  }

}


//AUTHOR-LOGIN
const authorLogin = async function (req, res) {
  try {
    let authorName = req.body.email;
    let password = req.body.password;

    let specificAuther = await authorModel.findOne({ email: authorName, password: password });

    if (!specificAuther)
      return res.status(404).send({
        status: false,
        logInFailed: "username or the password is not correct",
      });


    let token = jwt.sign(
      {
        authId: specificAuther._id,
        batch: "blogSite-phase2",
        organisation: "FunctionUp",
      },
      "blogSites-phase2", { expiresIn: "1hr" }
    );

    return res.status(201).send({ status: true, TOKEN: token });

  } catch (err) {
    return res.status(500).send({ ERROR: err.message });
  }
}



module.exports.createAuthor = createAuthor;
module.exports.authorLogin = authorLogin;