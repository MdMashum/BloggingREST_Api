const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js"
const authorController = require("../controllers/autherController");
const blogController = require('../controllers/blogsController');


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createAuther", authorController.createAuther);
router.post("/createBlogs", blogController.createBlogs);
router.get("/getSpecificBlogs",blogController.getSpecificBlogs)
router.put("/blogs/:blogId", blogController.updateBlogs)
router.delete("/deletedByQueryParams",blogController.deletedByQueryParams)




// Q1 Cowin Apies
// router.get("/getStates",cowincontroler.getStates);
// router.get("/getDistricts/:stateId",cowincontroler.getDistricts);   
// router.get("/getByPin/gitPin",cowincontroler.getByPin); 
// router.get("/getBydistrictId",cowincontroler.getDistrictByDate)

// // Q2 Weather Apis
// router.get("/getWeather", weatherController.getWeather);
// router.get("/getTemprature", weatherController.getTemprature);

// //Memes Apis


// router.get("/getMames", MamesControler.getMames);
// router.post("/MamesId",MamesControler.MamesId)











module.exports = router;