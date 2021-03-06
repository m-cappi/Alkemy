import React from "react";
import Table from "react-bootstrap/Table";
import BalanceRow from "./BalanceRow";

const BalanceTable = ({ data }) => {
    return (
        <Table table table-striped responsive>
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Concept</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Category</th>
                    <th scope="col">Type</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <BalanceRow key={row.ID} {...row} />
                ))}
            </tbody>
        </Table>
    );
};

export default BalanceTable;
