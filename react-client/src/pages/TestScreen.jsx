import React, { useContext, useEffect, useState } from "react";
import { useAsync } from "react-async";
import CategoryFilter from "../components/CategoryFilter";
import TransactionTable from "../components/TransactionTable";
import connection from "../database/db";
import { CategoryFilterContext } from "../contexts/CategoryFilterContext";

async function loadIncome({ endpoint }) {
    const res = await connection.get(endpoint); //endpoint
    if (!res.ok) throw new Error(res.message);
    return res.json();
}

const TestScreen = () => {
    console.log("estoy en TestScreen");
    //
    const { categoryFilter } = useContext(CategoryFilterContext);
    console.log(categoryFilter);

    const [endpoint, setendpoint] = useState(
        categoryFilter
            ? `view/income?id_category=${categoryFilter}`
            : "view/income"
    );
    console.log(endpoint);

    const { data, error, isPending } = useAsync({
        promiseFn: loadIncome,
        endpoint,
        watch: endpoint,
    });

    useEffect(() => {
        setendpoint(
            categoryFilter
                ? `view/income?id_category=${categoryFilter}`
                : "view/income"
        );
    }, [categoryFilter]);

    if (isPending) return "Loading...";
    if (error) return `Something went wrong: ${error.message}`;
    if (data)
        return (
            <div className="p-2 px-md-5 align-self-stretch text-center">
                <h1>Income Screen</h1>

                <CategoryFilter />
                <TransactionTable data={data.data} />
            </div>
        );
};

export default TestScreen;
