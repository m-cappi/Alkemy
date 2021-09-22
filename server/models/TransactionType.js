/** @format */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const TransactionType = sequelize.define(
    "TransactionType",
    {
        id_types: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name_type: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false,
        },
    },
    {
        tableName: "transaction_types",
        timestamps: false,
    }
);
//console.log(TransactionType === sequelize.models.TransactionType);
module.exports = { TransactionType };
