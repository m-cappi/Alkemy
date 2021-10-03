const { ViewTransaction } = require("../models/ViewTransaction");
const asyncHandler = require("express-async-handler");

//@DESC Get 10 most recent Transactions
//@ROUTE /view/last10
//@METHOD Get
const getLast10 = asyncHandler(async (req, res, next) => {
    try {
        const last10 = await ViewTransaction.findAll({
            limit: 10,
            where: { Owner: req.user.email },
        });
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
    console.log("llegue a getIncomeList");
    try {
        let filter = { Type: "Income" };
        filter.owner = req.user.email;
        if (req.query.id_category) {
            filter.id_category = req.query.id_category;
        }
        console.log(filter);
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
        filter.owner = req.user.email;
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
            where: { Type: "Income", Owner: req.user.email },
        });
        const sumExpenses = await ViewTransaction.sum("Amount", {
            where: { Type: "Expense", Owner: req.user.email },
        });

        let mibal;
        if (sumIncome && sumExpenses) {
            mibal = sumIncome - sumExpenses;
        } else if (sumIncome) {
            mibal = sumIncome;
        } else {
            mibal = 0 - sumExpenses;
        }

        const balance = {
            success: true,
            data: { balance: mibal },
        };
        res.status(200).json(balance);
    } catch (err) {
        next(err);
    }
});

module.exports = { getLast10, getIncomeList, getExpensesList, getBalance };
