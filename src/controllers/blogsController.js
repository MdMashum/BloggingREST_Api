const blogModel = require("../models/blogModels");
const authorModel = require("../models/authorModel");

// 2) create Blog controller
const createBlog = async function (req, res) {
  try {
    let blog = req.body;
    if (blog) {
      let author = await authorModel.find({ _id: blog.authorId });
      if (author.length != 0) {
        let blogCreated = await blogModel.create(blog);

        if (blog.isPublished === true) {
          let mainBlog = await blogModel.findOneAndUpdate(
            { _id: blogCreated._id },
            { $set: { publishedAt: Date.now() } },
            { new: true }
          );

          return res.status(201).send({ publishedBlog: mainBlog });
        }
        return res.status(201).send({ unPublishedBlog: blogCreated });
      } else {
        return res.status(404).send({ ERROR: "Author does not exist" });
      }
    } else {
      return res.status(400).send({ ERROR: "BAD REQUEST" });
    }
  } catch (err) {
    return res.status(500).send({ ERROR: err.message });
  }
};


// 3) getAllBlog controller
const getSpecificAllBlogs = async function (req, res) {
  try {
    let data = req.query;
    let filter = {
      isDeleted: false,
      isPublished: true,
      ...data,
    };

    let getSpecificBlogs = await blogModel.find(filter);

    if (getSpecificBlogs.length == 0) {
      return res.status(400).send({ status: false, ERROR: "No blogs can be found" });
    } else {
      return res.status(200).send({ status: true, GetBlog: getSpecificBlogs });
    }
  } catch (error) {
    return res.status(500).send({ status: false, ERROR: error.message });
  }
};

//4) Updating Blog controller
const updateBlog = async function (req, res) {
  try {
    let data = req.body;
    let blogId = req.params.blogId;
    let x = await blogModel.findById(blogId);

    if (x) {
      if (x.isDeleted === false) {
        if (x.isPublished === true) {
          let dataNeedToBeUpdated = await blogModel.findOneAndUpdate(
            { _id: blogId },
            { $set: { isPublished: true, publishedAt: Date.now() } }
          );
        }

        let updatedBlog = await blogModel.findOneAndUpdate(
          { _id: blogId },
          { ...data },
          { new: true }
        );

        return res.status(200).send({ UPDATEDBLOG: "blog updated successfully", updatedBlog });
      } else {
        return res.status(404).send({ ERROR: "blog not found" });
      }
    } else {
      return res.status(404).send({ ERROR: "blog id not found" });
    }
  } catch (err) {
    return res.status(500).send({ ERROR: err.message });
  }
};



// 5)Delete blog by path params controller

let deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    if (!blogId) { return res.status().send({ status: false, ERROR: "No Blogs are found With this Id" }) };
    if (blogId) {
      let deletedBlog = await blogModel.findOneAndUpdate(
        { _id: blogId },
        { $set: { isDeleted: true }, deletedAt: Date.now() },
        { new: true }
      );
     
      return res.status(201).send({ status: true, DeletedBlogsResult: "Deleted Blog" });
    } else 
    return res.status(400).send({ERROR:"BAD REQUEST"});
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// 6)Delete blog by using Query Params controller
let deletedByQueryParams = async function (req, res) {
  try {
    let data = req.query;
    if (!data) { return res.status().send({ status: false, ERROR: "No Blogs are found With this Id" }) };
    if (data) {
      let deletedBlogsFinal = await blogModel.updateMany(
        { $in: data },
        { $set: { isDeleted: true }, deletedAt: Date.now() }
      );
      return res.status(201).send({ status: true, msg: "Deleted Blog" });
    } else {
      return res.status(400).send({ ERROR: "BAD REQUEST" });
    }
  } catch (err) {
    return res.status(500).send({ ERROR: err.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.updateBlog = updateBlog;
module.exports.getSpecificAllBlogs = getSpecificAllBlogs;
module.exports.deleteBlog = deleteBlog;
module.exports.deletedByQueryParams = deletedByQueryParams;