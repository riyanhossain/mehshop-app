const express = require('express');
const { insertProduct } = require('../controllers/product');
const imageUpload = require('../middlewares/imageUpload');
const { verifyJwtToken } = require('../middlewares/verifyJwtToken');

const router = express.Router();

router.post('/products', verifyJwtToken, imageUpload.single("pImage"), insertProduct)

module.exports = router;