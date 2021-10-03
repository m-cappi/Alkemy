const { Category } = require("../models/Category");
const asyncHandler = require("express-async-handler");

//@DESC Get categories list
//@ROUTE /category
//@METHOD Get
const getCategory = asyncHandler(async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ success: true, data: categories });
    } catch (err) {
        next(err);
    }
});

module.exports = { getCategory };
