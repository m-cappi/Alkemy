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
    //console.log(data);
    
});

router.get("/income", async function (req, res, next) {
    //SELECT
    let sentence = "select * from view_transactions where type = 'income'"
    if(req.query?.id_category){
        sentence += ` and id_category = ${req.query.id_category}`
    }
    let data = await pool.query(sentence);
    res.status(200).json(data);
    //console.log(data);
});

router.get("/expenses", async function (req, res, next) {
    //SELECT
    let sentence = "select * from view_transactions where type = 'expense'"
    if(req.query?.id_category){
        sentence += ` and id_category = ${req.query.id_category}`
    }
    let data = await pool.query(sentence);
    res.status(200).json(data);
    //console.log(data);
});

router.get("/", async function (req, res, next) {
    //SELECT
    let data = await pool.query("select * from view_transactions");
    res.status(200).json(data);
    //console.log(data);
});



router.post("/", async (req, res, next) => {
    //INSERT
    let sentencia = newTransactions(req.body)
    console.log(sentencia)
    let data = await pool.query(sentencia)
    res.status(201).json(data)
    //console.log(data)

});

router.put("/", async (req, res, next) => {
    //UPDATE
    let sentencia = updateTransaction(req.body)
    console.log(sentencia);
    let data = await pool.query(sentencia);
    res.status(201).json(data);
    //console.log(data);
});

router.delete("/", async (req, res, next) => {
    //DELETE
    let sentencia = deleteTransactions(req.body)
    console.log(sentencia)
    let data = await pool.query(sentencia)
    res.status(201).json(data)
    //console.log(data)
});

module.exports = router;
