const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogsController")
const MiddleWere = require("../middlewares/Auth")

//API's-creating Author
router.post("/createAuthor",authorController.createAuthor)
router.post("/login",authorController.authorLogin);

//API's Blog
router.post("/createBlog",MiddleWere.authorise,blogController.createBlog);

router.get("/getAllBlog",MiddleWere.authorise,blogController.getSpecificAllBlogs);


router.put("/updateBlog/:blogId",MiddleWere.authoriseForUpdateandDelete, blogController.updateBlog);
router.delete("/deleted/blogs/:blogId",MiddleWere.authoriseForUpdateandDelete, blogController.deleteBlog);
router.delete("/deletedByQuery",MiddleWere.authoriseDeleteForQueryParams,blogController.deletedByQueryParams);














module.exports = router;