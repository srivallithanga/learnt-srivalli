var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
title: { type: String, required: true },
author: { type: mongoose.Schema.ObjectId, ref: "Author", required: true },
summary: { type: String },
isbn: { type: String, required: true },
category: { type: mongoose.Schema.ObjectId, ref: "Category", required: true },
});

const Book = mongoose.model("Book", bookSchema);
// const Todo = mongoose.model("Todo", todoSchema);
module.exports = Book;