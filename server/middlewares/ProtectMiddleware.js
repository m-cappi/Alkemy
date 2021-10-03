const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const asyncHandler = require("express-async-handler");

const ProtectMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        res.status(401);
        throw new Error("Missing token!");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findByPk(decoded.id);

        next();
    } catch (error) {
        res.status(401);
        throw new Error(error.message);
    }
});

module.exports = { ProtectMiddleware };
