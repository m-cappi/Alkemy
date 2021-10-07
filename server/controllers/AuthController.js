const { User } = require("../models/User");
const { generateToken } = require("../utils/generateToken.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const saltRounds = 10;

//@DESC Login User
//@ROUTE /auth/login
//@METHOD POST
const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body.data;

        const user = await User.findByPk(email);

        if (!user) throw new Error("Invalid credentials");

        const match = await bcrypt.compare(password, user.password);

        if (match)
            res.status(201).json({
                success: true,
                data: {
                    name: user.full_name,
                    email: user.email,
                    is_admin: user.is_admin,
                    token: generateToken(user.email),
                },
            });
        else throw new Error("Invalid credentials");
    } catch (err) {
        next(err);
    }
});

//@DESC Register User
//@ROUTE /auth/register
//@METHOD POST
const register = asyncHandler(async (req, res, next) => {
    try {
        const { email, password, full_name, is_admin } = req.body.data;

        const userExist = await User.findByPk(email);
        if (userExist) {
            res.status(401);
            throw new Error("User already exists");
        }

        const user = await User.create(
            {
                email,
                password,
                full_name,
                is_admin,
            },
            {
                validate: true,
                silent: true,
                fields: ["email", "password", "full_name", "is_admin"],
            }
        );
        res.status(201).json({
            success: true,
            data: {
                name: user.full_name,
                email: user.email,
                is_admin: user.is_admin,
                token: generateToken(user.email),
            },
        });
    } catch (err) {
        next(err);
    }
});

module.exports = { register, login };
