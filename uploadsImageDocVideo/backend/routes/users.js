var express = require('express');
var router = express.Router();

/* GET users listing. */
const usersController = require("../controllers/users");
router.get("/", usersController.index);
router.post("/", usersController.createUser);
router.get("/login", usersController.getLogin);
router.post("/login", usersController.login);

module.exports = router;
