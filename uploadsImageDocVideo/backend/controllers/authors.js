const { body, validationResult} = require("express-validator");
const Author = require("../models/authors");

exports.createAuthor = [
    body("first_name").isLength({min:3}).withMessage("Min length should be 3"),
    body("last_name").isLength({max:10}).withMessage("Max length of last name should be 10"),
    async function(req, res, next){
        const errors=validationResult(req);
        if(errors.isEmpty()){
            let {first_name, last_name, dob, dod}=req.body;
            let authorOb=new Author({first_name, last_name, dob, dod});
            let result=await authorOb.save();
            res.json(result);
        }
        else{
            res.send(errors);
        }
    },
];

exports.index = async function (req, res, next){
    let results=await Author.find();
    res.json(results);
};

exports.deleteAuthor = async function (req,res,next) {
    let idToDelete = req.params.id;
    let result = await Author.findByIdAndDelete(idToDelete);
    res.json(result) 
};

exports.putAuthor = async function (req,res,next) {
    let{first_name,last_name,dob,dod} = req.body;
    let result = await Author.findByIdAndUpdate(req.params.id, { first_name, last_name, dob, dod });
    res.json(result) 
};