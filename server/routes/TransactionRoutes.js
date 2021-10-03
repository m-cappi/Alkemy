const express = require("express");
const {
    insertTransaction,
    updateTransaction,
    deleteTransaction,
} = require("../controllers/TransactionController");
const { ProtectMiddleware } = require("../middlewares/ProtectMiddleware");

const router = express.Router();

router.route("/").post(ProtectMiddleware, insertTransaction);
router.route("/").put(ProtectMiddleware, updateTransaction);
router.route("/").delete(ProtectMiddleware, deleteTransaction);

module.exports = router;
