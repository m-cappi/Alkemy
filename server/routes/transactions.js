/** @format */

var express = require("express");
var router = express.Router();
var pool = require("../pool.js");
const updateTransaction = require('../modules/updateTransactions')
const newTransactions = require('../modules/newTransactions')
const deleteTransactions = require('../modules/deleteTransactions')

router.get("/pagination", async (req, res, next) => {
    sentencia = `select Date, Concept, Amount, Category, Type from view_transactions ORDER BY Date desc limit ${req.query.pos}, ${req.query.step};`
    console.log(sentencia)
    let data = await pool.query(sentencia)
    res.status(200).json(data);
    console.log(data);
    
});

router.get("/income", async function (req, res, next) {
    //SELECT
    //select * from view_transactions where type = 'income' and category in (select categ_name from categories where id_category = 3);
    let data = await pool.query("select * from view_transactions where type = 'income'");
    res.status(200).json(data);
    console.log(data);
});

router.get("/expenses", async function (req, res, next) {
    //SELECT
    //http://localhost:3000/transactions/expenses

    let data = await pool.query("select * from view_transactions where type = 'expense'");
    res.status(200).json(data);
    console.log(data);
});

router.get("/", async function (req, res, next) {
    //SELECT

    let data = await pool.query("select * from view_transactions");
    res.status(200).json(data);
    console.log(data);
});



router.post("/", async (req, res, next) => {
    //INSERT
    let sentencia = newTransactions(req.body)
    console.log(sentencia)
    let data = await pool.query(sentencia)
    res.status(201).json(data)
    console.log(data)

});

router.put("/", async (req, res, next) => {
    //UPDATE
    console.log(req.body)
    let sentencia = updateTransaction(req.body)
    console.log(sentencia);
    let data = await pool.query(sentencia);
    //let data = await pool.query(updateTransaction(req.body))
    res.status(201).json(data);
    console.log(data);
});

router.delete("/", async (req, res, next) => {
    //DELETE
    let sentencia = deleteTransactions(req.body)
    console.log(sentencia)
    let data = await pool.query(sentencia)
    res.status(201).json(data)
    console.log(data)
});

module.exports = router;
