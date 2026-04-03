const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

if (!API_KEY) {
  console.warn('VITE_TMDB_API_KEY is missing. Add it to .env file.')
}

const fetchJson = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('API request failed')
  return await res.json()
}

export const getPopularMovies = (page = 1) =>
  fetchJson(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)

export const getTopRatedMovies = (page = 1) =>
  fetchJson(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)

export const getUpcomingMovies = (page = 1) =>
  fetchJson(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`)

export const getMovieDetails = (id) =>
  fetchJson(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)

export const getMovieCredits = (id) =>
  fetchJson(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)

export const searchMovies = (query, page = 1) =>
  fetchJson(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`)
