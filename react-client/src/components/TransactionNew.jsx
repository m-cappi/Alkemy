import React, { useRef, useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CategoryOptions from "./CategoryOptions";

import today from "../helpers/Date";
import { submitTransaction } from "../helpers/CRUD";
import { RefreshContext } from "../contexts/RefreshContext";
import ErrorWarning from "./ErrorWarning";

const TransactionNew = () => {
    const { refresh, setRefresh } = useContext(RefreshContext);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const newDate = useRef(null);
    const newConcept = useRef(null);
    const newAmount = useRef(null);
    const newCategory = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            creation_date: newDate.current.value,
            concept: newConcept.current.value,
            amount: newAmount.current.value,
            fk_category: newCategory.current.value,
            fk_type: e.target.querySelector("input[name=fk_type]:checked")
                .value,
        };

        await submitTransaction(payload)
            .then(() => {
                e.target.reset();
                setError(null);
                setRefresh(!refresh);
                handleClose();
            })
            .catch((err) => {
                setError(true);
            });

        return;
    };

    return (
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleShow}
            >
                +Add Transaction
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                        New Transaction
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleClose}
                    />
                </div>

                <ErrorWarning error={error} />

                <form id="newEntry" onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div>
                            <label htmlFor="newConcept" className="form-label">
                                Concept
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="concept"
                                id="newConcept"
                                ref={newConcept}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="newAmount" className="form-label">
                                Quantity
                            </label>
                            <input
                                className="form-control"
                                type="number"
                                name="amount"
                                ref={newAmount}
                                id="newAmount"
                                step="any"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="newDate" className="form-label">
                                Date
                            </label>
                            <input
                                className="form-control"
                                type="date"
                                name="creation_date"
                                id="newDate"
                                ref={newDate}
                                defaultValue={today}
                                required
                            />
                        </div>
                        <div className="p-3">
                            <div className="form-check">
                                <label
                                    htmlFor="newIncome"
                                    className="form-check-label"
                                >
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="fk_type"
                                        defaultValue={1}
                                        id="newIncome"
                                    />
                                    Income
                                </label>
                            </div>
                            <div className="form-check">
                                <label
                                    htmlFor="newExpense"
                                    className="form-check-label"
                                >
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="fk_type"
                                        defaultValue={2}
                                        id="newExpense"
                                        required
                                    />
                                    Expense
                                </label>
                            </div>
                        </div>
                        <div>
                            <select
                                className="form-select"
                                name="fk_category"
                                id="newCategory"
                                ref={newCategory}
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Choose a category...
                                </option>
                                {/* Inject categories HERE */}
                                <CategoryOptions />
                            </select>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleClose}
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default React.memo(TransactionNew);
