import { useEffect, useReducer } from 'react'
import MovieGrid from '../../components/MovieGrid'
import Pagination from '../../components/Pagination'
import { getUpcomingMovies } from '../../utils/api'
import './index.css'

const initialState = {
  movies: [],
  page: 1,
  totalPages: 1,
  loading: true,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return { ...state, loading: true, error: null }
    case 'success':
      return {
        ...state,
        movies: action.payload.movies,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      }
    case 'failure':
      return { ...state, loading: false, error: action.payload }
    case 'setPage':
      return { ...state, page: action.payload }
    default:
      return state
  }
}

const UpcomingPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'start' })
    getUpcomingMovies(state.page)
      .then((d) => {
        dispatch({
          type: 'success',
          payload: { movies: d.results || [], totalPages: d.total_pages || 1 },
        })
      })
      .catch((e) => dispatch({ type: 'failure', payload: e.message || 'Failed to load' }))
  }, [state.page])

  return (
    <section className="movies-page">
      <h1>Upcoming Movies</h1>
      {state.loading && <p>Loading upcoming movies...</p>}
      {state.error && <p className="error">{state.error}</p>}
      {!state.loading && !state.error && <MovieGrid movies={state.movies} />}
      <Pagination
        page={state.page}
        totalPages={Math.min(state.totalPages, 500)}
        onPageChange={(nextPage) => dispatch({ type: 'setPage', payload: nextPage })}
      />
    </section>
  )
}

export default UpcomingPage
