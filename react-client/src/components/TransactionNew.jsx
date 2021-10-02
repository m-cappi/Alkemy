import React, { useRef } from "react";
import CategoryOptions from "./CategoryOptions";
import today from "../helpers/Date"
import {submitTransaction} from "../helpers/CRUD"

const TransactionNew = () => {
    const newDate = useRef(null);
    const newConcept = useRef(null);
    const newAmount = useRef(null);
    const newCategory = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            creation_date: newDate.current.value,
            concept: newConcept.current.value,
            amount: newAmount.current.value,
            fk_category: newCategory.current.value,
            fk_type: e.target.querySelector("input[name=fk_type]:checked")
                .value,
        };
        submitTransaction([payload])
        console.log(payload);
    };

    return (
        <div>
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                +Add Transaction
            </button>
            {/* Modal */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="true"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                            >
                                New Transaction
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <form id="newEntry" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div>
                                    <label
                                        htmlFor="newConcept"
                                        className="form-label"
                                    >
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
                                    <label
                                        htmlFor="newAmount"
                                        className="form-label"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="amount"
                                        ref={newAmount}
                                        id="newAmount"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="newDate"
                                        className="form-label"
                                    >
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
                                                required
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
                                                defaultChecked
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
                                    data-bs-dismiss="modal"
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(TransactionNew);
