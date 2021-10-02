import React, { useContext } from "react";
import PropTypes from "prop-types";
import CategoryOptions from "./CategoryOptions";
import { CategoryFilterContext } from "../contexts/CategoryFilterContext";

const CategoryFilter = () => {
    const { categoryFilter, setCategoryFilter } = useContext(
        CategoryFilterContext
    );

    const handleChange = (e) => {
        setCategoryFilter(e.target.value);
    };

    return (
        <>
            <label className="form-label">
                Filter by...
                <select
                    className="form-select"
                    name="fk_category"
                    value={{ categoryFilter } || ""}
                    onChange={handleChange}
                >
                    <option value="" hidden>
                        {categoryFilter}
                    </option>
                    <option value="">Show all</option>
                    <CategoryOptions />
                </select>
            </label>
        </>
    );
};

CategoryFilter.propTypes = {};

export default CategoryFilter;
