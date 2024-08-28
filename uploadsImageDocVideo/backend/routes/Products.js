const express = require('express');
const router = express.Router();
const productController = require("../controllers/Products");

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/search/name/:name', productController.findProductByName);
router.get('/search/availability/:availability', productController.findProductByAvailability);
router.get('/search/price/:price', productController.findProductByPriceGreaterThan);

module.exports = router;
