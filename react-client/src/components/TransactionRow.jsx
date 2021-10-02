import React from "react";
import TransactionEdit from "./TransactionEdit";

const TransactionRow = (props) => {
    const { ID, Date, Amount, Category} = props;

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

export default TransactionRow;
