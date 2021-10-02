import React from "react";
import { useAsync } from "react-async";
import { loadBalance } from "../helpers/CRUD";

const BalanceNum = () => {
    const { data, error, isPending } = useAsync({ promiseFn: loadBalance });

    if (isPending) return "Loading...";
    if (error) return `Something went wrong:${error.message}`;
    if (data) return <h1>Balance: {data.data.balance}</h1>;
};

export default BalanceNum;
