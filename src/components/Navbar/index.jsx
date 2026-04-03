import { useMemo, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import './index.css'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useMemo(() => new URLSearchParams(location.search), [location.search])
  const initialQuery = params.get('query') || ''

  const [query, setQuery] = useState(initialQuery)

  const onSubmit = (event) => {
    event.preventDefault()
    if (!query.trim()) return
    navigate(`/search?query=${encodeURIComponent(query)}&page=1`)
  }

  return (
    <header className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')}>movieDB</div>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Popular
        </NavLink>
        <NavLink to="/top-rated" className={({ isActive }) => (isActive ? 'active' : '')}>
          Top Rated
        </NavLink>
        <NavLink to="/upcoming" className={({ isActive }) => (isActive ? 'active' : '')}>
          Upcoming
        </NavLink>
      </nav>
      <form className="navbar-search" onSubmit={onSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search movies..."
          aria-label="Search movies"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  )
}

export default Navbar
