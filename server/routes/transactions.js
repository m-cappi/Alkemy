/** @format */

var express = require("express");
var router = express.Router();
var pool = require("../pool.js");


router.get("/", async function (req, res, next) {
    //SELECT
    res.status(201).json(data);

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