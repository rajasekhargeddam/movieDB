import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import PopularPage from './pages/Popular'
import TopRatedPage from './pages/TopRated'
import UpcomingPage from './pages/Upcoming'
import SearchResultsPage from './pages/SearchResults'
import MovieDetailsPage from './pages/MovieDetails'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<PopularPage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App