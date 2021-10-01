import React, { useRef, useState } from "react";
import {
    CloseButton,
    Form,
    FormControl,
    InputGroup,
    Table,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CategoryOptions from "./CategoryOptions";

const TransactionEdit = (props) => {
    const { ID, Date, Concept, Amount, id_category, Category, Typ } = props;

    const [show, setShow] = useState(false);
    const editDate = useRef(null);
    const editConcept = useRef(null);
    const editAmount = useRef(null);
    const editCategory = useRef(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = () => {
        const payload = { id_transaction: ID };
        if (editDate.current.value)
            payload.creation_date = editDate.current.value;
        if (editConcept.current.value)
            payload.concept = editConcept.current.value;
        if (editAmount.current.value) payload.amount = editAmount.current.value;
        if (editCategory.current.value)
            payload.fk_category = editCategory.current.value;
        console.log(payload);
    };
    const handleDelete = () => {
        const payload = { id_transaction: ID };
        console.log(payload);
    };

    return (
        <>
            <a onClick={handleShow} className="underline">
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
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                    />
                </div>
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
                                        className="form-control "
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Concept</th>
                                <td>{Concept}</td>
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
                                            step="any"
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
                                        {/* Inject categories HERE */}
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
            </Modal>
        </>
    );
};

export default TransactionEdit;
