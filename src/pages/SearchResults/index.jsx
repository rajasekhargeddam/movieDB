import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MovieGrid from '../../components/MovieGrid'
import Pagination from '../../components/Pagination'
import { searchMovies } from '../../utils/api'
import './index.css'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const SearchResultsPage = () => {
  const navigate = useNavigate()
  const queryParams = useQuery()
  const search = queryParams.get('query') || ''
  const currentPage = Number(queryParams.get('page') || 1)

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(currentPage)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (!search.trim()) {
      setMovies([])
      return
    }

    setLoading(true)
    searchMovies(search, page)
      .then((data) => {
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 1)
        setError(null)
      })
      .catch((err) => setError(err.message || 'Search failed'))
      .finally(() => setLoading(false))

    navigate(`/search?query=${encodeURIComponent(search)}&page=${page}`, { replace: true })
  }, [search, page, navigate])

  if (!search) {
    return (
      <section className="movies-page">
        <h1>Search Movies</h1>
        <p className="error">Enter a query in the navbar search box.</p>
      </section>
    )
  }

  return (
    <section className="movies-page">
      <h1>Search Results for "{search}"</h1>
      {loading && <p>Loading results...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <MovieGrid movies={movies} />}
      <Pagination page={page} totalPages={Math.min(totalPages, 500)} onPageChange={setPage} />
    </section>
  )
}

export default SearchResultsPage
