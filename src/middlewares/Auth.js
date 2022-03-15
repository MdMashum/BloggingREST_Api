const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModels");

const authorise = function (req, res, next) {
  // compared the logged in user's Id and the Id in request
 try{let token = req.headers["x-api-key"];
  if (!token)
    return res.status(400).send({
      status: false,
      msg: "token must be present in the request header",
    });
  let decodedToken = jwt.verify(token, "blogSites-phase2");

  if (!decodedToken)
    return res.status(400).send({ status: false, msg: "token is not valid" });

  
  let authorID = req.body.authorId;
  let authorID2 = req.query.authorId;

  
  let userLoggedIn = decodedToken.userId;

    
  if(!authorID){
  if (authorID2 != userLoggedIn )
    return res.status(400).send({
      status: false,
      msg: "User logged is not allowed to modify the requested users data",
    });}
     if(!authorID2){
        if (authorID != userLoggedIn )
    return res.status(400).send({
      status: false,
      msg: "User logged is not allowed to modify the requested users data",
    });} 
     

  next();}
  catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};
const authoriseForUpdateandDelete = async function (req, res, next) {
  // Get the Id from header
  try{let blogId = req.params.blogId;
  // validate the token
  let token = req.headers["x-api-key"];
  if (!token)
    return res.status(404).send({
      status: false,
      msg: "token must be present in the request header",
    });

  let x = await blogModel.findById(blogId);

  let autherID = x.authorId;

  let decodedToken = jwt.verify(token, "blogSites-phase2");

  if (!decodedToken)
    return res.status(403).send({ status: false, msg: "token is not valid" });
  let userLoggedIn = decodedToken.userId;

  if (autherID != userLoggedIn)
    return res.status(401).send({
      status: false,
      msg: "User logged is not allowed to modify the requested users data",
    });

  next();} catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};
const authoriseDeleteForQueryParams = async function (req, res, next) {
 try {let blogId2 = req.query.blogId;

  let token = req.headers["x-api-key"];
  if (!token)
    return res.status(403).send({
      status: false,
      msg: "token must be present in the request header",
    });
  let y = await blogModel.findById(blogId2);

  let autherID2 = y.authorId;
  let decodedToken = jwt.verify(token, "blogSites-phase2");

  if (!decodedToken)
    return res.status(404).send({ status: false, msg: "token is not valid" });
  let userLoggedIn = decodedToken.userId;

  if (autherID2 != userLoggedIn)
    return res.status(401).send({
      status: false,
      msg: "User logged is not allowed to modify the requested users data",
    });

  next();} catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

module.exports.authorise = authorise;
module.exports.authoriseForUpdateandDelete = authoriseForUpdateandDelete;
module.exports.authoriseDeleteForQueryParams = authoriseDeleteForQueryParams;
