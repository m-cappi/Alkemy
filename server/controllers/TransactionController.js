const { Transaction } = require("../models/Transaction");
const asyncHandler = require("express-async-handler");

//@DESC Insert a single new Transaction
//@ROUTE /transaction
//@METHOD Post
const insertTransaction = asyncHandler(async (req, res, next) => {
    try {
        const data = req.body.data;
        const transaction = await Transaction.create(
            {
                creation_date: data.creation_date,
                concept: data.concept,
                amount: data.amount,
                fk_type: data.fk_type,
                fk_category: data.fk_category,
            },
            {
                validate: true,
                silent: true,
                fields: [
                    "concept",
                    "creation_date",
                    "amount",
                    "fk_category",
                    "fk_type",
                ],
            }
        );
        res.status(201).json({ success: true, data: transaction });
    } catch (err) {
        next(err);
    }
});

//@DESC Update 1 Transaction by Id
//@ROUTE /transaction
//@METHOD Put
const updateTransaction = asyncHandler(async (req, res, next) => {
    // console.log(req.body.data);
    try {
        const { concept, creation_date, amount, fk_category, id_transaction } =
            req.body.data;
        const update = await Transaction.update(
            { concept, creation_date, amount, fk_category },
            { where: { id_transaction: id_transaction }, validate: true }
        );
        // console.log(update);
        res.status(200).json({ success: true, data: update });
    } catch (err) {
        next(err);
    }
});

//@DESC Delete 1 or more Transactions by Id
//@ROUTE /transaction
//@METHOD Delete
const deleteTransaction = asyncHandler(async (req, res, next) => {
    try {
        const idsToDelete = req.body.data
            .map((obj) => parseInt(obj.id_transaction))
            .filter(Number);
        const delTransaction = await Transaction.destroy({
            where: { id_transaction: idsToDelete },
        });
        res.status(204).json({ success: true, data: delTransaction });
    } catch (err) {
        next(err);
    }
});

module.exports = { insertTransaction, updateTransaction, deleteTransaction };
