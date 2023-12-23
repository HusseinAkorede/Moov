import { useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import { Loader, MovieCard } from '../components';

const SearchResults = () => {
  const { searchTerm } = useParams()
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState()
  const [nextMovies, setNextMovies] = useState()
  const [searchInput, setSearchInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('movie');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const dataRef = useRef()
  const getChecked = () => { 
    if(selectedOption =='movie'){
      return false
    }else{
      return true
    }
   }
    const getSearch = async() => {
        const response = await fetch(`https://api.themoviedb.org/3/search/${selectedOption}?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc&query=${searchInput}`)
        const data = await response.json()
        if(data.results){
          setMovies(data.results)
          setLoading(false)
          dataRef.current = data
          console.log('Loading')
        }else{
          setLoading(true)
        }
    }
    // window.location.reload();
  const getNextPage = async() => { 
      if(dataRef.current?.total_pages == undefined || dataRef.current?.page == undefined){
        return ''
      }
      if(dataRef.current?.total_pages > dataRef.current?.page){
        const response = await fetch(`https://api.themoviedb.org/3/search/${selectedOption}?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc&query=${searchInput}&page=${dataRef.current?.page + 1}`)
        const data = await response.json()
        if(data.results){
          // setNextMovies(data.results)
          setMovies(prevMovies => [...prevMovies, ...data.results]);
          setLoading(false)
          dataRef.current = data
          
        }else{
          setLoading(true)
        }
      }
   }
   const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Perform your action here
      getSearch()
      // Add your desired functionality here
    }
  };
  return (
    <div className='px-5 md:px-10 '>
      <div className=' justify-center smd:flex-row flex-col mt-3 flex  text-center'>
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className='smd:w-[70%] w-full border-2 border-black p-3'
        />
        <div className='smd:w-30% w-full flex'>
            <select className=' flex-1 border-2 border-black p-3' value={selectedOption} onChange={handleOptionChange}>
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
            </select>
          <button
           onClick={getSearch} className=' bg-black p-3 text-white  flex-1'
           >Search</button> 
        </div>
      </div>
      <div className=''>
      { loading? (
        <div><Loader /></div>
        ) : dataRef?.current?.results.length === 0 ? ( <p>No Movies Found</p>) : (
        <div>
          <h2 className='text-3xl font-bold text-center my-6'> Search Results For: {searchInput}</h2>
        <div className='flex flex-wrap'>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} loading={loading} checked={getChecked()} withSplide={false} />
          ))}
        </div>
        </div>
      )}
      </div>
      <div className='flex justify-center my-3'>
      {dataRef?.current?.results && dataRef.current.total_pages > dataRef.current?.page ? (
  <button
    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
    onClick={getNextPage}
  >
    Load More
  </button>
) : ''}
        
      </div>
    </div>
  )
}

export default SearchResults