import React from 'react'
import { Categories } from "../models/demo";


//Categories
const CategoryOptions = () => {
    const categories = Categories.data
    return (
        <>
            {categories.map((categ)=>(<option key={categ.id_category} value={categ.id_category}>
                                            {categ.categ_name}
                                        </option>))}
        </>
    )
}

export default React.memo(CategoryOptions)
