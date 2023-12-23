import './App.css'
import { Home, MovieDetails, Casts, Reviews, KeyWords, SearchResults } from './pages'
import { Header } from './components'
import {  Route, Routes } from 'react-router-dom'


function App() {

  return (
    <div className=''>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:linkText" element={<MovieDetails />} />
        <Route path="/movies/:linkText/casts" element={<Casts />} />
        <Route path="/movies/:linkText/reviews" element={<Reviews />} />
        <Route path="/keyword/:keywordID/" element={<KeyWords />} />
        <Route path="/search/" element={<SearchResults />} />
        <Route path="/search/:searchTerm/" element={<SearchResults />} />
      </Routes>
      <div className='text-center mx-auto px-10 my-10 max-w-[1000px]'>
        <p>&copy; Moov is a Free Movies site with zero ads. We let you find the next movie to watch. Although We do not Support watching movies Yet, We do recommend <a target='_blank'href='https://play.google.com/store/apps/details?id=com.justwatch.justwatch' className='text-blue-500'>JustWatch</a></p>
      </div>
    </div>
  )
}

export default App
