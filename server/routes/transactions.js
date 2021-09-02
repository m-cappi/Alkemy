/** @format */

var express = require("express");
var router = express.Router();
var pool = require("../pool.js");

router.get("/", async function (req, res, next) {
    //SELECT
    let data = await pool.query("select * from view_transacciones");
    res.status(200).json(data);
    console.log(data);
});
router.post("/", async (req, res, next) => {
    //INSERT
});
router.put("/", async (req, res, next) => {
    //UPDATE
});
router.delete("/", async (req, res, next) => {
    //DELETE
});

module.exports = router;
