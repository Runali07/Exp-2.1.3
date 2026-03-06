const Product = require("../models/product.js");

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

exports.getLowStockProducts = async (req, res) => {
    const result = await Product.aggregate([
        { $unwind: "$variants" },
        { $match: { "variants.stock": { $lt: 10 } } }
    ]);

    res.json(result);
};

exports.categoryRatings = async (req, res) => {
    const result = await Product.aggregate([
        {
            $group: {
                _id: "$category",
                avgCategoryRating: { $avg: "$avgRating" }
            }
        }
    ]);

    res.json(result);
};