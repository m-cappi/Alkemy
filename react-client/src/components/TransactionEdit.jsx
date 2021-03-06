import React, { useContext, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CategoryOptions from "./CategoryOptions";
import { RefreshContext } from "../contexts/RefreshContext";
import { editTransaction, deleteTransaction } from "../helpers/CRUD";
import today from "../helpers/Date";
import ErrorWarning from "./ErrorWarning";

const TransactionEdit = (props) => {
    const { ID, Date, Concept, Amount, Category } = props;
    const { refresh, setRefresh } = useContext(RefreshContext);
    const [error, setError] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editDate = useRef(null);
    const editConcept = useRef(null);
    const editAmount = useRef(null);
    const editCategory = useRef(null);

    const handleSubmit = () => {
        const payload = { id_transaction: ID };
        if (editDate.current.value)
            payload.creation_date = editDate.current.value;
        if (editConcept.current.value)
            payload.concept = editConcept.current.value;
        if (editAmount.current.value) payload.amount = editAmount.current.value;
        if (editCategory.current.value)
            payload.fk_category = parseInt(editCategory.current.value);
        editTransaction(payload)
            .then(() => {
                setError(null);
                handleClose();
                setRefresh(!refresh);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
    };

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
                setError(err);
            });
    };

    return (
        <>
            <a onClick={handleShow} className="underline text-truncate">
                {Concept}
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

                <ErrorWarning error={error} />

                <Modal.Body>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th></th>
                                <th colSpan="2" className="row gap-1">
                                    <div className="col-12 col-md">
                                        Current value
                                    </div>
                                    <div className="col-12 col-md">
                                        Edit for
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Date</th>
                                <td colSpan="2" className="row gap-1">
                                    <div className="col-12 col-md">{Date}</div>
                                    <div className="col-12 col-md-7">
                                        <input
                                            type="date"
                                            ref={editDate}
                                            name="creation_date"
                                            defaultValue={today}
                                            className="form-control "
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>Concept</th>
                                <td colSpan="2" className="row gap-1">
                                    <div className="col-12 col-md text-break">
                                        {Concept}
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <input
                                            type="text"
                                            ref={editConcept}
                                            name="concept"
                                            className="form-control "
                                        />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <th>Amount</th>
                                <td colSpan="2" className="row gap-1">
                                    <div className="col-12 col-md text-break">
                                        {Amount}
                                    </div>
                                    <div className=" col-12 col-md-7">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    $
                                                </div>
                                            </div>
                                            <input
                                                ref={editAmount}
                                                type="number"
                                                name="amount"
                                                className="form-control"
                                                step="0"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>Category</th>
                                <td colSpan="2" className="row gap-1">
                                    <div className="col-12 col-md">
                                        {Category}
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <select
                                            className="form-select"
                                            name="fk_category"
                                            ref={editCategory}
                                            defaultValue=""
                                        >
                                            <option hidden value="">
                                                Choose a category...
                                            </option>
                                            {/* Inject categories HERE */}
                                            <CategoryOptions />
                                        </select>{" "}
                                    </div>
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
            </Modal>
        </>
    );
};

export default TransactionEdit;
