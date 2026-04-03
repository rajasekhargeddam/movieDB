import { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails, getMovieCredits, IMAGE_BASE } from '../../utils/api'
import './index.css'

const initialMovieDetailsState = {
  details: null,
  cast: [],
  loading: true,
  error: null,
}

const movieDetailsReducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return { ...state, loading: true, error: null }
    case 'success':
      return {
        ...state,
        details: action.payload.details,
        cast: action.payload.cast,
        loading: false,
        error: null,
      }
    case 'failure':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const MovieDetailsPage = () => {
  const { id } = useParams()
  const [state, dispatch] = useReducer(movieDetailsReducer, initialMovieDetailsState)

  useEffect(() => {
    if (!id) return
    dispatch({ type: 'start' })
    Promise.all([getMovieDetails(id), getMovieCredits(id)])
      .then(([movie, movieCredits]) => {
        dispatch({
          type: 'success',
          payload: { details: movie, cast: movieCredits.cast ? movieCredits.cast.slice(0, 20) : [] },
        })
      })
      .catch((e) => dispatch({ type: 'failure', payload: e.message || 'Unable to load movie details' }))
  }, [id])

  if (state.loading) return <p className="page-loading">Loading movie details...</p>
  if (state.error) return <p className="error">{state.error}</p>
  if (!state.details) return null

  const poster = state.details.poster_path ? `${IMAGE_BASE}${state.details.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'

  return (
    <section className="movie-details-page">
      <div className="movie-details-card">
        <img src={poster} alt={state.details.title} />
        <div className="movie-details-content">
          <h1>{state.details.title}</h1>
          <p>Rating: {state.details.vote_average?.toFixed(1) || 'N/A'}</p>
          <p>Duration: {state.details.runtime} mins</p>
          <p>Genre: {state.details.genres?.map((g) => g.name).join(', ') || 'N/A'}</p>
          <p>Release Date: {state.details.release_date}</p>
          <p className="overview">Overview: {state.details.overview}</p>
        </div>
      </div>

      <section className="cast-section">
        <h2>Cast</h2>
        <div className="cast-grid">
          {state.cast.map((member) => (
            <article key={member.cast_id || member.id} className="cast-member">
              <img
                src={member.profile_path ? `${IMAGE_BASE}${member.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'}
                alt={member.name}
              />
              <p className="actor-name">{member.name}</p>
              <p className="character-name">as {member.character}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default MovieDetailsPage
