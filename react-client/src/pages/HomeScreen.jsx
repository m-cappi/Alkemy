import BalanceTable from "../components/BalanceTable";
import { useAsync } from "react-async";
import BalanceNum from "../components/BalanceNum";
import { RefreshContext } from "../contexts/RefreshContext";
import { useContext } from "react";
import { loadTable } from "../helpers/CRUD";
import Loading from "../components/Loading";
import EmptyTable from "../components/EmptyTable";

const HomeScreen = () => {
    const { refresh } = useContext(RefreshContext);

    const { data, error, isPending } = useAsync({
        promiseFn: loadTable,
        watch: refresh,
    });

    if (isPending) return <Loading />;
    if (error) return `Something went wrong:${error.message}`;
    if (data)
        return (
            <>
                <div className="container-fluid p-2 px-md-5 align-self-stretch text-center">
                    <BalanceNum />
                    {Array.isArray(data.data) && data.data.length ? (
                        <BalanceTable data={data.data} />
                    ) : (
                        <EmptyTable />
                    )}
                </div>
            </>
        );
};

export default HomeScreen;
