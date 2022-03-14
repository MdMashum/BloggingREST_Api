const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;



const createBlog = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    body: { type: String, trim: true },
    authorId: { required: true, type: mongoose.Types.ObjectId, refs: "Author" },
    tags: [{ type: String, trim: true }],
    category: { type: String, required: true, trim: true },
    subcategory: [{ type: String, trim: true }],
    deletedAt: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    publishedAt: { type: String, default: null },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", createBlog);

// { title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string},
//  category: {string, mandatory, examples: [technology, entertainment, life style, food, fashion]},
//   subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] },
//    createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false},
//  publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}
