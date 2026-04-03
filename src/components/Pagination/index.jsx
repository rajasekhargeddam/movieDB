import './index.css'

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null

  const handlePrev = () => onPageChange(Math.max(1, page - 1))
  const handleNext = () => onPageChange(Math.min(totalPages, page + 1))

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page <= 1}>
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  )
}

export default Pagination
