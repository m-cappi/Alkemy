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
        },
        categ_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
    },
    { tableName: "categories", timestamps: false }
);


//console.log(Category === sequelize.models.Category)
module.exports = { Category };
