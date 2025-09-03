import React from 'react'

const Category = ({ c, filterFunction, index,setFilteredTab,filteredTab,setProducts }) => {
    return (
        <h1
         className={`category ${filteredTab === index ? "active" :""}`} 
         onClick={() => { 
            filterFunction(index); 
            setFilteredTab(index)
             setProducts(allProducts)
            }}
            >
            {c.charAt(0).toUpperCase() + c.slice(1)}
        </h1>
    )
}

export default Category
