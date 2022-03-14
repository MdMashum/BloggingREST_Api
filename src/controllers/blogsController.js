const blogModels = require("../models/blogModels");

let createBlogs = async function (req, res) {
  let body = req.body;
  let createBlogs = await blogModels.create(body);
  res.status(201).send({ data: createBlogs });
};

let getSpecificBlogs = async function (req, res) {
  try {
    let data = req.query;
    let filter = {
      isDeleted: false,
      isPublished: true,
      ...data,
    };
    let getSpecificBlogs = await blogModels.find(filter);

    if (getSpecificBlogs.length == 0) {
      res.status(400).send({ status: false, data: "No blogs can be found" });
    } else {
      res.status(200).send({ status: true, data: getSpecificBlogs });
    }
  } catch (error) {
    res.status(400).send({ status: false, msg: error.message });
  }
}


// PUT /blogs/:blogId
// Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
// Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like this
// Return an HTTP status 200 if updated successfully with a body like this

let updateBlogs = async  function(req,res){
    let title = req.body.title;
    let body = req.body.body;
    let Id = req.params.blogId;
    console.log(title,body);

    let updateBlogs = await blogModels.updateMany({_id:Id},{title:title},{body:body})
    res.send({data:updateBlogs})
}

let deletedByQueryParams = async function(req,res){
  try{
     let category = req.query.category
     let authorId = req.query.authorId
     let tagName = req.query.tagName
     console.log(tagName)
     let subCategoryName = req.query.subCategoryName
     let isPublished = req.query.isPublished
 
     if(category || authorId || tagName || subCategoryName || isPublished===false  ){
         
 
     let blogsToBeDeletedByCategory = await blogModels.find({category:category}).select({_id:1})
     let deletedBlogs= blogsToBeDeletedByCategory.map(ele=>ele._id)
 
    
     let blogsToBeDeletedByAuthorid = await blogModels.find({author:authorId}).select({_id:1})
     let deletedBlogs1= blogsToBeDeletedByAuthorid.map(ele=>ele._id)
 
     let blogsToBeDeletedIfUnpublished = await blogModels.find({isPublished:false}).select({_id:1})
     let deletedBlogs2= blogsToBeDeletedIfUnpublished.map(ele=>ele._id)
 
 
 
 
    //  let blogsToBeDeletedByTagName = await blogModels.find({tags:tags.tagName}).select({_id:1})
    //  let deletedBlogs3= blogsToBeDeletedByTagName.map(ele=>ele._id)
 
 
 
    //  let blogsToBeDeletedBysubCategory = await blogModels.find({subcategory: subcategory.subCategoryName}).select({_id:1})
    //  let deletedBlogs4= blogsToBeDeletedBysubCategory.map(ele=>ele._id)
 
 
     let deletedBlogsFinal = await blogModels.updateMany({_id : {$in : deletedBlogs1||deletedBlogs2||deletedBlogs}},{$set:{isDeleted:true}})
 
 
          res.status(200).send(deletedBlogsFinal);
      } else { res.status(400).send({ERROR:"BAD REQUEST"})}
 
 }
  catch(err){res.status(500).send({ERROR:err.message})}
  }








module.exports.createBlogs = createBlogs;
module.exports.getSpecificBlogs = getSpecificBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deletedByQueryParams = deletedByQueryParams;
