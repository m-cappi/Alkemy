/** @format */

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("alkemy", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: (...msg) => console.log(msg),
});

//Closing the connection!!
//Sequelize will keep the connection open by default, and use the same connection for all queries. If you need to close the connection, call sequelize.close() (which is asynchronous and returns a Promise).

const tryMe = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database online");
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
};
//tryMe()

module.exports = {sequelize}