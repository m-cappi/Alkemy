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
            validate: { isInt: true },
        },
        name_type: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false,
            validate: {
                is: {
                    args: /^[\w][\w ]{1,43}[\w]$/m,
                    msg: "Invalid characters. Admits only: a-Z,0-9, ,_",
                },
            },
        },
    },
    {
        tableName: "transaction_types",
        timestamps: false,
    }
);
//console.log(TransactionType === sequelize.models.TransactionType);
module.exports = { TransactionType };
