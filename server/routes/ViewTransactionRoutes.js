/** @format */

const express = require("express");
const {
    getLast10,
    getIncomeList,
    getExpensesList,
    getBalance,
} = require("../controllers/ViewTransactionController");

const router = express.Router();

router.route("/last10").get(getLast10);
router.route("/income").get(getIncomeList);
router.route("/expense").get(getExpensesList);
router.route("/balance").get(getBalance);

module.exports = router;
