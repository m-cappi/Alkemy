import React from "react";
import { useAsync } from "react-async";
import { loadCategories } from "../helpers/CRUD";

const CategoryOptions = () => {
    const { data, error, isPending } = useAsync({ promiseFn: loadCategories });
    if (isPending) return "Loading...";
    if (error) return `Something went wrong: ${error.message}`;
    if (data)
        return (
            <>
                {data.data.map((categ) => (
                    <option key={categ.id_category} value={categ.id_category}>
                        {categ.id_category}-{categ.categ_name}
                    </option>
                ))}
            </>
        );
};

export default React.memo(CategoryOptions);
