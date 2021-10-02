import React from "react";
import PropTypes from "prop-types";

const BalanceRow = ({ Date, Concept, Amount, Category, Type }) => {
    return (
        <tr>
            <td>{Date}</td>
            <td>{Concept}</td>
            <td>{Amount}</td>
            <td>{Category}</td>
            <td>{Type}</td>
        </tr>
    );
};

BalanceRow.propTypes = {};

export default BalanceRow;
