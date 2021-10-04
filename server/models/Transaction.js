const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/db");
const { TransactionType } = require("./TransactionType");
const { Category } = require("./Category");
const { User } = require("./User");

const Transaction = sequelize.define(
    "Transaction",
    {
        id_transaction: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: { isInt: true },
        },
        creation_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: Sequelize.NOW,
            validate: { isDate: true },
        },
        concept: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                is: {
                    args: /^[\w][\w ]{1,43}[\w]$/m,
                    msg: "Invalid characters. Admits only(3-45): a-Z,0-9, ,_",
                },
            },
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { isFloat: true },
        },
        modification_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            validate: { isDate: true },
        },
        fk_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: TransactionType, key: "id_types " },
            validate: { isInt: true },
        },
        fk_category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Category, key: "id_category" },
            validate: { isInt: true },
        },
        owner: {
            type: DataTypes.STRING(45),
            allowNull: false,
            references: { model: User, key: "email" },
            validate: { isEmail: true },
        }
    },
    {
        tableName: "transactions",
        timestamps: false,
        createdAt: "creation_date",
        updatedAt: "modification_date",
    }
);
//console.log(Transaction === sequelize.models.Transaction);

module.exports = { Transaction };
