import React, { useState } from "react";
//NO SE USA
const TransactionForm = () => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(!show)
    console.log("yo uso TransactionForm")
    const form =  (<form id="newEntry">
    <div>
        <label htmlFor="newConcept">Concept</label>
        <input
            type="text"
            name="concept"
            id="newConcept"
            required
        />
    </div>
    <div>
        <label htmlFor="newAmount">Quantity</label>
        <input
            type="number"
            name="amount"
            id="newAmount"
            required
        />
    </div>
    <div>
        <label htmlFor="newDate">Date</label>
        <input
            type="date"
            name="creation_date"
            id="newDate"
            required
        />
    </div>
    <div>
        <label htmlFor="newIncome">
            <input
                type="radio"
                name="fk_type"
                defaultValue={1}
                id="newIncome"
                required
            />
            Income
        </label>
        <label htmlFor="newExpense">
            <input
                type="radio"
                name="fk_type"
                defaultValue={2}
                id="newExpense"
                defaultChecked
            />
            Expense
        </label>
    </div>
    <div>
        <label htmlFor="newCategory">Category</label>
        <select name="fk_category" id="newCategory" required>
            <option  value="" disabled >
                Category
            </option>
        </select>
    </div>
    <input type="submit" defaultValue="Submit Transaction" />
</form>)

    return (
        <article>
            {show ? (<><button onClick={handleShow}>Collapse</button> <br /> {form}</>) : (<button onClick={handleShow}>+New Transaction</button>) }
           
        </article>
    );
};

export default TransactionForm;
