const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const authorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss"],
    },

    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required:true,
      unique:true
    },
    password:{
     type:String,
     required:true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);

// { fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]},

//  email: {mandatory, valid email, unique}, password: {mandatory} }
// function ValidateEmail(mail) 
// {
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
//   {
//     return (true)
//   }
//     alert("You have entered an invalid email address!")
//     return (false)
// }
// date: {
//     type: String,
//     default: "22/11/2021",
//   }