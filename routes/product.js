const express = require('express');
const { insertProduct, getAllTheProducts, getProductsByCategory } = require('../controllers/product');
const imageUpload = require('../middlewares/imageUpload');
const { verifyJwtToken } = require('../middlewares/verifyJwtToken');

const router = express.Router();

router.post('/products', verifyJwtToken, imageUpload.single("pImage"), insertProduct)

router.get('/all', getAllTheProducts);

router.get('/:name(fruits|herbs|drinks)', getProductsByCategory);

module.exports = router;