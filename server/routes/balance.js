/** @format */

var express = require("express");
var router = express.Router();
var pool = require("../pool.js");

router.get("/", async function (req, res, next) {
    //SELECT
    let sumIncome = await pool.query("Select sum(amount) as income from transactions where fk_type=1;");
    let sumExpenses = await pool.query('Select sum(amount) as expenses from transactions where fk_type=2')
    console.log(sumIncome[0]?.income - sumExpenses[0]?.expenses)
    let dif = sumIncome[0]?.income - sumExpenses[0]?.expenses
    data={balance: dif}
    res.status(200).json(data);
    console.log(data);
});
router.post("/", async (req, res, next) => {
    //INSERT
});

module.exports = router;