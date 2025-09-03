
const Pagination = ({currentPage,setCurrentPage,noOfPages}) => {
    return (
        <div>
            <div className="pagination">
                <button disabled={currentPage === 0 && true} onClick={() => setCurrentPage(prev => prev - 1)}>◀</button>
                {[...Array(noOfPages)].map((_, index) => (
                    <button key={index} onClick={() => setCurrentPage(index)} className={`${currentPage === index && "active"}`}>{index + 1}</button>
                ))}
                <button disabled={currentPage === noOfPages - 1 && true} onClick={() => setCurrentPage(prev => prev + 1)}>▶</button>
            </div>
        </div>
    )
}

export default Pagination
