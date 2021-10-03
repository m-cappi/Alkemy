import React, { useContext, useEffect, useState } from "react";
import { useAsync } from "react-async";
import CategoryFilter from "../components/CategoryFilter";
import Loading from "../components/Loading";
import TransactionTable from "../components/TransactionTable";
import { CategoryFilterContext } from "../contexts/CategoryFilterContext";
import { RefreshContext } from "../contexts/RefreshContext";
import {loadExpense} from "../helpers/CRUD";

const ExpenseScreen = () => {
    const { categoryFilter } = useContext(CategoryFilterContext);
    
    const { refresh, setRefresh } = useContext(RefreshContext);

    const [endpoint, setendpoint] = useState(
        categoryFilter
            ? `view/expense?id_category=${categoryFilter}`
            : "view/expense"
    );

    const { data, error, isPending } = useAsync({
        promiseFn: loadExpense,
        endpoint,
        watch: refresh,
    });

    useEffect(() => {
        setendpoint(
            categoryFilter
                ? `view/expense?id_category=${categoryFilter}`
                : "view/expense"
        );
        setRefresh(!refresh);
    }, [categoryFilter]);

    if (isPending) return <Loading />;
    if (error) return `Something went wrong: ${error.message}`;
    if (data)
        return (
            <div className="p-2 px-md-5 align-self-stretch text-center">
                <h1>Expense Screen</h1>

                <CategoryFilter />
                <TransactionTable data={data.data} />
            </div>
        );
};

export default ExpenseScreen;
