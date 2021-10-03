const { User } = require("../models/User");

//TODO
//editUser
//deleteUser


//@DESC Get Single User
//@ROUTE /user/:id
//@METHOD GET
const getUser = async (req, res) => {
    const user = await User.findByPk(req.query.id);
    //const user = await User.findByPk(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(201).json({ success: true, data: user });
};

//@DESC Register a single new User
//@ROUTE /user
//@METHOD Post
const addUser = async (req, res, next) => {
    try {
        const data = req.body.data;
        const user = await User.create(
            {
                email: data.email,
                password: data.password, 
                full_name: data.full_name,
                is_admin: data.is_admin,
            },
            {
                validate: true,
                silent: true,
                fields: ["email", "password", "full_name", "is_admin"],
            }
        );
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

module.exports = { getUser, addUser };
