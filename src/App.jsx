import { useEffect, useState, Suspense, lazy } from "react"
import "./index.css"
import Pagination from "./components/Pagination";
import Category from "./components/Category"
const App = () => {
  const Card = lazy(() => import("./components/Card"));

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])

  let [allProducts, setAllProducts] = useState([]);
  const [filteredTab, setFilteredTab] = useState(null)

  const noOfCardOnOnePage = 10;
  const noOfPages = Math.ceil(products.length / noOfCardOnOnePage);
  
  const [currentPage, setCurrentPage] = useState(0)
  const [start, setStart] = useState(currentPage * 10)
  const [end, setEnd] = useState(currentPage * noOfCardOnOnePage + 10)

  const filterByCategory = (index) => {
    setStart(0)
    setEnd(products.length-1)
    const filteredProducts = allProducts.filter((p) => p.category == category[index])
    console.log(filteredProducts)
    setProducts(filteredProducts)
  }
  const fetchData = async () => {
    const products = await fetch('https://dummyjson.com/products?limit=200')
    const productsCategory = await fetch('https://dummyjson.com/products/category-list')
    const productsData = await products.json()
    const productsategoryData = await productsCategory.json()
    setProducts(productsData.products)
    setAllProducts(productsData.products)
    setCategory(productsategoryData)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        noOfPages={noOfPages}
      />
      <div className="category-container">
        <h1
          onClick={() => {
            setProducts(allProducts)
            setFilteredTab(null)
          }
          }
          className={`category${products.length === allProducts.length ? " active" : ""}`}
        >All</h1>
        {category.map((c, index) => (
          <Category
            filterFunction={filterByCategory}
            c={c}
            setProducts={setProducts}
            index={index}
            key={index}
            setCategory={setCategory}
            setFilteredTab={setFilteredTab}
            filteredTab={filteredTab}
            active={products.length > 0 && products[0].category === c}
          />
        ))}
      </div>
      <Suspense fallback={<p className="loading">Loading....</p>} >
        <div className="card-container">
          {products.slice(start, end).map((p, index) => (
            <Card p={p} key={index} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}

export default App
