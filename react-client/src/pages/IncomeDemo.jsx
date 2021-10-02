import React from 'react'
import CategoryFilter from '../components/CategoryFilter';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import { Income, Expense, Last10, Balance, Categories } from "../models/demo";
//
const IncomeScreen = () => {
    return (
        <div className="p-2 px-md-5 align-self-stretch text-center">
            <h1>Income Screen</h1>
           
            <CategoryFilter />
            <TransactionTable data={Income.data} />
        </div>
    )
}

export default IncomeScreen