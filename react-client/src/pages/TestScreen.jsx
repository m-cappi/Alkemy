import React, { useContext, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { RefreshContext } from "../contexts/RefreshContext";
import today from "../helpers/Date";
import CategoryOptions from "../components/CategoryOptions";

import {
    editTransaction,
    deleteTransaction,
    submitTransaction,
} from "../helpers/CRUD";
import { Form } from "react-bootstrap";

//
const TestScreen = (props) => {
    //Empieza Edit
    const { ID, Date, Concept, Amount, Category } = props;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editDate = useRef(null);
    const editConcept = useRef(null);
    const editAmount = useRef(null);
    const editCategory = useRef(null);

    const handleDelete = () => {
        const payload = { id_transaction: ID };
        deleteTransaction([payload])
            .then(() => {
                setError(null);
                handleClose();
                setRefresh(!refresh);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            });
    };

    //Empieza New
    const { refresh, setRefresh } = useContext(RefreshContext);
    const [error, setError] = useState(null);
    const newDate = useRef(null);
    const newConcept = useRef(null);
    const newAmount = useRef(null);
    const newCategory = useRef(null);
    const handleSubmit = async (e) => {
        console.log(e.target);
        e.preventDefault();
        const payload = {
            creation_date: newDate.current.value,
            concept: newConcept.current.value,
            amount: parseInt(newAmount.current.value),
            fk_category: newCategory.current.value,
            fk_type: e.target.querySelector("input[name=fk_type]:checked")
                .value,
        };
        console.log(payload);
        const foo = await submitTransaction(payload)
            .then(() => {
                e.target.reset();
                setError(null);
                setRefresh(!refresh);
            })
            .catch((err) => {
                setError(true);
            });
        return;
    };
    //return <Loading />
    return (
        <>
            {/* <a onClick={handleShow} className="underline text-truncate">
      boton
    </a>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
    >
        <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
                Edit Transaction
            </h5>
            <button
                type="button"
                className="btn-close"
                onClick={handleClose}
            />
        </div>
        {error && (
            <div className="alert alert-danger" role="alert">
                Ups! Something went wrong
            </div>
        )}
        <Modal.Body>
            <Table responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>Current</th>
                        <th>Edit for</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <td>{Date}</td>
                        <td className="">
                            <input
                                type="date"
                                ref={editDate}
                                name="creation_date"
                                defaultValue={today}
                                className="form-control "
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Concept</th>
                        <td className="text-break">{Concept}</td>
                        <td>
                            <input
                                type="text"
                                ref={editConcept}
                                name="concept"
                                className="form-control "
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Amount</th>
                        <td>{Amount}</td>
                        <td>
                            <div className="input-group my-2 ">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        $
                                    </div>
                                </div>
                                <input
                                    ref={editAmount}
                                    type="number"
                                    name="amount"
                                    className="form-control "
                                    step="0"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>Category</th>
                        <td>{Category}</td>
                        <td>
                            <select
                                className="form-select "
                                name="fk_category"
                                ref={editCategory}
                                defaultValue=""
                            >
                                <option hidden value="">
                                    Choose a category...
                                </option>
                            
                                <CategoryOptions />
                            </select>{" "}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
                Save
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Back
            </Button>
            <Button
                className="mx-3"
                variant="danger"
                size="sm"
                onClick={handleDelete}
            >
                Delete
            </Button>
        </Modal.Footer>
    </Modal> */}

            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
            >
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
                                onClick={handleClose}
                            />
                        </div>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                Ups! Something went wrong
                            </div>
                        )}
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
                                        step="0"
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
                                     
                                        <CategoryOptions />
                                    </select>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
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
            </Modal> */}

<button
                type="button"
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
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
                                onClick={handleClose}
                            />
                        </div>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                Ups! Something went wrong
                            </div>
                        )}
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
                                        step="0"
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

export default TestScreen;
