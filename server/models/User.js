/** @format */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcrypt");

const User = sequelize.define(
    "User",
    {
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            validate: { isEmail: true },
        },
        password: { type: DataTypes.STRING(255), allowNull: false },
        full_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                is: {
                    args: /[a-z A-Z]{2,45}/,
                    msg: "Invalid name. Admits only: ' ', a-Z. Length 2 to 45",
                },
            },
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
            validate: {
                isBoolean: ((val) => {
                    return typeof val === "boolean";
                })(),
            },
        },
    },
    {
        tableName: "users",
        timestamps: false,
        hooks: {
            beforeCreate: async (user) => {
             if (user.password) {
              const salt = await bcrypt.genSaltSync(10, 'a');
              user.password = bcrypt.hashSync(user.password, salt);
             }
            },
            beforeUpdate:async (user) => {
             if (user.password) {
              const salt = await bcrypt.genSaltSync(10, 'a');
              user.password = bcrypt.hashSync(user.password, salt);
             }
            }
           }
    }
);

module.exports = { User };
