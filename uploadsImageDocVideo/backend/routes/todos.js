const express = require('express');
const router = express.Router();


// const sanitizeText = (text) => {
//     const cleanText = sanitizeHtml(text, { allowedTags: [] });
//     return cleanText.replace(/[^a-zA-Z\s]/g, ''); 
//   };
const todoController = require("../controllers/todos");
  router.post('/', todoController.createTodo);


router.get('/', todoController.index);

router.get('/:id', todoController.getTodo);

router.put('/:id', todoController.putTodo);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;