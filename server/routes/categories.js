/** @format */

var express = require("express");
var router = express.Router();
var pool = require("../pool.js");

router.get("/", async function (req, res, next) {
    //SELECT
    let data = await pool.query("select * from categories");
    res.status(200).json(data);
    //console.log(data);
});

router.post("/", async (req, res, next) => {
    //INSERT
});

module.exports = router;
