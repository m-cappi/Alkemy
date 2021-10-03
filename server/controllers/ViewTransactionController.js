const { ViewTransaction } = require("../models/ViewTransaction");
const asyncHandler = require("express-async-handler");

//@DESC Get 10 most recent Transactions
//@ROUTE /view/last10
//@METHOD Get
const getLast10 = asyncHandler(async (req, res, next) => {
    try {
        const last10 = await ViewTransaction.findAll({ limit: 10 });
        res.status(200).json({ success: true, data: last10 });
    } catch (err) {
        next(err);
    }
});

//@DESC Get all Transactions that were Income
//@ROUTE /view/income
//@DESC * filtered by category
//@ROUTE /view/income?id_category=1
//@METHOD Get
const getIncomeList = asyncHandler(async (req, res, next) => {
    try {
        let filter = { Type: "Income" };
        if (req.query.id_category) {
            filter.id_category = req.query.id_category;
        }
        const income = await ViewTransaction.findAll({ where: filter });
        res.status(200).json({ success: true, data: income });
    } catch (err) {
        next(err);
    }
});

//@DESC Get all Transactions that were Expense
//@ROUTE /view/expense
//@DESC * filtered by category
//@ROUTE /view/expense?id_category=1
//@METHOD Get
const getExpensesList = asyncHandler(async (req, res, next) => {
    try {
        let filter = { Type: "Expense" };
        if (req.query.id_category) {
            filter.id_category = req.query.id_category;
        }
        const expenses = await ViewTransaction.findAll({ where: filter });
        res.status(200).json({ success: true, data: expenses });
    } catch (err) {
        next(err);
    }
});

//@DESC Get global balance from all Transactions (Income - Expense)
//@ROUTE /view/balance
//@METHOD Get
const getBalance = asyncHandler(async (req, res, next) => {
    try {
        const sumIncome = await ViewTransaction.sum("Amount", {
            where: { Type: "Income" },
        });
        const sumExpenses = await ViewTransaction.sum("Amount", {
            where: { Type: "Expense" },
        });
        const balance = {
            success: true,
            data: { balance: sumIncome - sumExpenses },
        };
        res.status(200).json(balance);
    } catch (err) {
        next(err);
    }
});

module.exports = { getLast10, getIncomeList, getExpensesList, getBalance };
