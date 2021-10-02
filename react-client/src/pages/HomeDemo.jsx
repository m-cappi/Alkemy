import React from 'react'
import BalanceTable from '../components/BalanceTable'
import {Income, Expense, Last10, Balance, Categories} from '../models/demo'
const HomeScreen = () => {

    return (
        <div className="container-fluid p-2 px-md-5 align-self-stretch text-center">
            <h1>Balance: {Balance.data.balance}</h1>
            <BalanceTable />
        </div>
    )
}

export default HomeScreen
