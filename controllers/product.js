const productModel = require("../models/product");
const fs = require("fs");

const insertProduct = async (req, res) => {
  const newUrl = new URL(`${req.protocol}://${req.get("host")}`);
  try {
    req.body.pImage = newUrl.origin + "/uploads/" + req.file.filename;
    req.body.fileName = req.file.filename;
    const product = new productModel(req.body);
    await product.save();
    res.status(200).json({
      message: "Product add successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllTheProducts = async (req, res) => {
  const Offset = isNaN(req.query.page)
    ? 1
    : parseInt(req.query.page) <= 1
    ? 1
    : parseInt(req.query.page);
  try {
    const products = await productModel.paginate(
      {},
      { offset: 10 * (Offset - 1), limit: 10 }
    );
    if (products.totalPages >= Offset) {
      res.status(200).json({
        message: "products fetched successfully",
        products: products.docs,
        nextPage: Offset + 1,
        prevPage: Offset - 1,
        totalPages: products.totalPages,
      });
    } else {
      res.status(200).json({
        message: "products not found",
        prevPage: Offset - 1,
      });
    }
  } catch {
    (err) => {
      res.status(500).json({
        message: err.message,
      });
    };
  }
};

const getProductsByCategory = async (req, res) => {
  const Offset = isNaN(req.query.page)
    ? 1
    : parseInt(req.query.page) <= 1
    ? 1
    : parseInt(req.query.page);
  try {
    const products = await productModel.paginate(
      {category: req.params.name},
      { offset: 10 * (Offset - 1), limit: 10 }
    );
    if (products.totalPages >= Offset) {
      res.status(200).json({
        message: "products fetched successfully",
        products: products.docs,
        nextPage: Offset + 1,
        prevPage: Offset - 1,
        totalPages: products.totalPages,
      });
    } else {
      res.status(200).json({
        message: "products not found",
        prevPage: Offset - 1,
      });
    }
  } catch {
    (err) => {
      res.status(500).json({
        message: err.message,
      });
    };
  }
};

module.exports = { insertProduct, getAllTheProducts, getProductsByCategory };
