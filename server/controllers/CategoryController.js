/** @format */

const { Category } = require("../models/Category");

//@DESC Get categories list
//@ROUTE /category
//@METHOD Get
const getCategory = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.status(201).json({ success: true, data: categories });
    } catch (err) {
        next(err);
    }
};

module.exports = { getCategory };
