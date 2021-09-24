const express = require("express")
const {insertTransaction, updateTransaction, deleteTransaction} = require("../controllers/TransactionController")

const router = express.Router();

router.route('/').post(insertTransaction)
router.route('/').put(updateTransaction)
router.route('/').delete(deleteTransaction)

module.exports = router;