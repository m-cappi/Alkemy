const express = require("express");
const {
    getLast10,
    getIncomeList,
    getExpensesList,
    getBalance,
} = require("../controllers/ViewTransactionController");
const { ProtectMiddleware } = require("../middlewares/ProtectMiddleware");


const router = express.Router();

router.route("/last10").get(ProtectMiddleware, getLast10);
router.route("/income").get(ProtectMiddleware, getIncomeList);
router.route("/expense").get(ProtectMiddleware, getExpensesList);
router.route("/balance").get(ProtectMiddleware, getBalance);

module.exports = router;
