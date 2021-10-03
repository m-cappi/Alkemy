import React, { useContext, useEffect, useState } from "react";
import { useAsync } from "react-async";
import CategoryFilter from "../components/CategoryFilter";
import EmptyTable from "../components/EmptyTable";
import Loading from "../components/Loading";
import TransactionTable from "../components/TransactionTable";
import { CategoryFilterContext } from "../contexts/CategoryFilterContext";
import { RefreshContext } from "../contexts/RefreshContext";
import { loadIncome } from "../helpers/CRUD";

const IncomeScreen = () => {
    const { categoryFilter } = useContext(CategoryFilterContext);

    const { refresh, setRefresh } = useContext(RefreshContext);

    const [endpoint, setEndpoint] = useState(
        categoryFilter
            ? `view/income?id_category=${categoryFilter}`
            : "view/income"
    );

    const { data, error, isPending } = useAsync({
        promiseFn: loadIncome,
        endpoint,
        watch: refresh,
    });

    useEffect(() => {
        setEndpoint(
            categoryFilter
                ? `view/income?id_category=${categoryFilter}`
                : "view/income"
        );
        setRefresh(!refresh);
    }, [categoryFilter]);

    if (isPending) return <Loading />;
    if (error) return `Something went wrong: ${error.message}`;
    if (data)
        return (
            <>
                <div className="p-2 px-md-5 align-self-stretch text-center">
                    <h1>Income Screen</h1>
                    <CategoryFilter />
                    {Array.isArray(data.data) && data.data.length ? (
                        <>
                            <TransactionTable data={data.data} />
                        </>
                    ) : (
                        <EmptyTable />
                    )}
                </div>
            </>
        );
};

export default IncomeScreen;
