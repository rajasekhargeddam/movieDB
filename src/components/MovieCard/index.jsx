import { Link } from 'react-router-dom'
import './index.css'
import { IMAGE_BASE } from '../../utils/api'

const MovieCard = ({ movie }) => {
  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'
  const genres = movie.genre_ids ? movie.genre_ids.join(', ') : ''

  return (
    <article className="movie-card">
      <img src={poster} alt={movie.title || movie.name} loading="lazy" />
      <div className="movie-card-info">
        <h3>{movie.title || movie.name}</h3>
        <p>Rating: {movie.vote_average?.toFixed(1) || 'N/A'}</p>
        {genres && <p className="movie-card-genre">Genre IDs: {genres}</p>}
        <Link className="view-details" to={`/movie/${movie.id}`}>
          View Details
        </Link>
      </div>
    </article>
  )
}

export default MovieCard
