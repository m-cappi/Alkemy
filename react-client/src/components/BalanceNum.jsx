import React from 'react'
import { useAsync } from "react-async"
import connection from "../database/db";

const loadBalance = async () => {
    const res = await connection.get("view/balance")
    if (!res.ok) throw new Error(res.message)
    return res.json()
  }

const BalanceNum = () => {
    const {data, error, isPending} = useAsync({promiseFn:loadBalance})
    // const {Balance} = useAsync({promiseFn:loadBalance})

    if (isPending) return "Loading..."
    if (error) return `Something went wrong:${error.message}`
    if (data) return (

            <h1>Balance: {data.data.balance}</h1> 

    )
}

export default BalanceNum
