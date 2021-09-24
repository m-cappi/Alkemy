/** @format */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Category = sequelize.define(
    "Category",
    {
        id_category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: { isInt: true },
        },
        categ_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: /^[\w][\w ]{1,43}[\w]$/m,
                    msg: "Invalid characters. Admits only: a-Z,0-9, ,_",
                },
            },
        },
    },
    { tableName: "categories", timestamps: false }
);

//console.log(Category === sequelize.models.Category)
module.exports = { Category };
