import React, { useState } from "react";
import PropTypes from "prop-types";
import TransactionEdit from "./TransactionEdit";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";

const TransactionRow = (props) => {
    const { ID, Date, Concept, Amount, id_category, Category, Type } = props;

    return (
        <>
            <tr>
                <td>{Date}</td>
                <td>
                    <TransactionEdit key={ID} {...props} />
                </td>
                <td>{Amount}</td>
                <td>{Category}</td>
            </tr>
        </>
    );
};

TransactionRow.propTypes = {};

export default TransactionRow;
