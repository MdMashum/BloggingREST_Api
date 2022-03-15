const blogModel = require("../models/blogModels");

// 2 nd create Blog Api
const createBlog = async function (req, res) {
  try {
    let blog = req.body;
    let authorCreated = await blogModel.create(blog);
    res.status(201).send({ data: authorCreated });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// 3 rd API  get All Blogs

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
      return res
        .status(400)
        .send({ status: false, data: "No blogs can be found" });
    } else {
      return res.status(200).send({ status: true, data: getSpecificBlogs });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

//4  put API for Updating Blog
const updateBlog = async function (req, res) {
  let blogId = req.params.blogId;

  let data = req.body;

  let x = await blogModel.findById(blogId);
  console.log(x);
  try {
    if (x) {
      if (x.isDeleted === false) {
        if (data.isPublished === true) {
          let a = await blogModel.findOneAndUpdate(
            { _id: blogId },
            { $set: { isPublished: true, publishedAt: Date.now() } }
          );
        }

        let updatedBlog = await blogModel.findOneAndUpdate(
          { _id: blogId },
          { ...data },
          { new: true }
        );

        return res
          .status(200)
          .send({ msg: "blog updated successfully", updatedBlog });
      } else {
        return res.status(404).send({ msg: "blog not found" });
      }
    } else {
      return res.status(404).send({ msg: "blog id not found" });
    }
  } catch (err) {
    return res.status(500).send({ ERROR: err.message });
  }
};

// 5 th API for deleting blog by path params

let deleteBlog = async function (req, res) {
  try {
    let id = req.params.blogId;
    console.log(id);
    if (id) {
      let deletedBlog = await blogModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true } }
      );
      console.log(deletedBlog);
      res.send(deletedBlog);
    } else res.status(400).send("BAD REQUEST");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// 6 th API  delete blog by using Query Params
let deletedByQueryParams = async function (req, res) {
  try {
    let data = req.query;

    if (data) {
      let deletedBlogsFinal = await blogModel.updateMany(
        { $in: data },
        { $set: { isDeleted: true } }
      );

      res.status(200).send({ status: true });
    } else {
      res.status(400).send({ ERROR: "BAD REQUEST" });
    }
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.updateBlog = updateBlog;
module.exports.getSpecificAllBlogs = getSpecificAllBlogs;

module.exports.deleteBlog = deleteBlog;
module.exports.deletedByQueryParams = deletedByQueryParams;
