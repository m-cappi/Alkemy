/** @format */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ViewTransaction = sequelize.define(
    "ViewTransaction",
    {
        ID: DataTypes.INTEGER,
        Date: DataTypes.DATEONLY,
        Concept: DataTypes.STRING(45),
        Amount: DataTypes.INTEGER,
        id_category: DataTypes.INTEGER,
        Category: DataTypes.STRING(45),
        Type: DataTypes.STRING(45),
    },
    { tableName: "view_transactions", timestamps: false }
);

module.exports = {ViewTransaction}