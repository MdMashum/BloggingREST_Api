const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogsController")


//API's-creating Author
router.post("/createAuthor",authorController.createAuthor)


//API's Blog
router.post("/createBlog",blogController.createBlog)

router.get("/getAllBlog",blogController.getSpecificAllBlogs)
router.put("/updateBlog/:blogId",blogController.updateBlog)
router.delete("/deleted/blogs/:blogId",blogController.deleteBlog)
router.delete("/deletedByQuery",blogController.deletedByQueryParams)











module.exports = router;