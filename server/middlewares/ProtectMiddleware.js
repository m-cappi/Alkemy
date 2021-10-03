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
        const user = await User.findByPk(decoded.id);
        const {email, full_name, is_admin} = user.dataValues
        req.user = {email, full_name, is_admin}
        
        next();
    } catch (error) {
        res.status(401);
        throw new Error(error.message);
    }
});

module.exports = { ProtectMiddleware };
