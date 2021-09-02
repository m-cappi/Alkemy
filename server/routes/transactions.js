/** @format */

var express = require("express");
var router = express.Router();
var pool = require("../pool.js");

router.get("/", async function (req, res, next) {
    //SELECT
    let data = await pool.query("select * from transactions");
    res.status(200).json(data);
    console.log(data);
});
router.post("/", async (req, res, next) => {
    //INSERT
});
router.put("/", async (req, res, next) => {
    //UPDATE
    //UPDATE TRANSACCION SET fecha_creacion=('1990-10-25 00:00:00') WHERE id_transaccion=2;
});
router.delete("/", async (req, res, next) => {
    //DELETE
});

module.exports = router;
