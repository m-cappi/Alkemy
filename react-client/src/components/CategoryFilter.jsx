import React, { useContext } from "react";
import CategoryOptions from "./CategoryOptions";
import { CategoryFilterContext } from "../contexts/CategoryFilterContext";

const CategoryFilter = () => {
    const { categoryFilter, setCategoryFilter } = useContext(
        CategoryFilterContext
    );

    const handleChange = (e) => {
        setCategoryFilter({
            fk_category: e.target.value,
            categ_name: e.target.selectedOptions[0].innerHTML,
        });
    };

    return (
        <>
            <label className="form-label">
                Filter by...
                <select
                    className="form-select"
                    name="fk_category"
                    onChange={handleChange}
                >
                    <option value="" hidden>
                        {categoryFilter?.categ_name ? categoryFilter.categ_name : "Show all"}
                    </option>
                    <option value="">Show all</option>
                    <CategoryOptions />
                </select>
            </label>
        </>
    );
};

export default CategoryFilter;
