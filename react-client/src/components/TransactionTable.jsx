import React from "react";
import Table  from "react-bootstrap/Table";
import TransactionRow from "./TransactionRow";

const TransactionTable = ({ data }) => {
    return (
        
        <Table table table-striped table-hover responsive >
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Concept</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Category</th>
                    {/* <th>edit</th> */}
                </tr>
            </thead>
            <tbody >
                {data.map((row) => (
                    <TransactionRow key={row.ID} {...row} />
                ))}
            </tbody>
        </Table>
    );
};

export default TransactionTable;
