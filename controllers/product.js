const productModel = require("../models/product");
const fs = require('fs');

const insertProduct = async (req, res) => {
  const newUrl = new URL(`${req.protocol}://${req.get("host")}`);
  try {
    req.body.pImage = newUrl.origin + "/uploads/" + req.file.filename;
    req.body.fileName = req.file.filename;
    const product  = new productModel(req.body)
    await product.save();
    res.status(200).json({
        message : "Product add successfully"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { insertProduct };
