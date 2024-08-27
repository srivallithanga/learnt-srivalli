const Book = require("../models/books");

exports.createBook = async function (req, res, next) {
    let title = req.body.title;
    let author = req.body.author;
    let summary = req.body.summary;
    let isbn = req.body.isbn;
    let category = req.body.category;

    const bookOb = new Book({
        title,
        author,
        summary,
        isbn,
        category,
    });

    try {
        await bookOb.save();
        res.json("Book created");
    } catch (err) {
        res.status(500).send("Unable to create book");
    }
};

exports.getBooksWithAuthors = async function (req, res) {
    try {
        const bookList = await Book.find().populate("author").populate("category").exec();
        res.json(bookList);
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};
