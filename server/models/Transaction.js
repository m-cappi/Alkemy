/** @format */

const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/db");
const { TransactionType } = require("./TransactionType");
const { Category } = require("./Category");

const Transaction = sequelize.define(
    "Transaction",
    {
        id_transaction: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        creation_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: Sequelize.NOW,
        },
        concept: { type: DataTypes.STRING(45), allowNull: false },
        amount: { type: DataTypes.INTEGER, allowNull: false },
        modification_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        fk_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: TransactionType, key: "id_types " },
        },
        fk_category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Category, key: "id_category" },
        },
    },
    {
        tableName: "transactions",
        timestamps: false,
        //createdAt: "creation_date",
        //updatedAt: "modification_date",
    }
);
//console.log(Transaction === sequelize.models.Transaction);

module.exports = { Transaction };
