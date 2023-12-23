import { useState, useEffect } from 'react'
import { Loader } from '.';
import { createLinkText, getGenreNamesByIds } from '../utils/extraFunctions'
import { Link } from 'react-router-dom';

const Hero = () => {


    const [heroMovie, setHeroMovie] = useState()
    const [actorsData, setActorsData] = useState()
    const [loading, setLoading] = useState(true)
    
    
      const fetchCastDetails = async (movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc`);
        const data = await response.json();
        setActorsData(data.cast || []);
      };

      const getHeroMovie = async () => {

        const getRandomGenreId = () => {
            const genreIds = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 878, 10770, 53, 10752, 37];
            const randomIndex = Math.floor(Math.random() * genreIds.length);
            return genreIds[randomIndex];
        };
          const getRandomMovieObjectNumber = () => {
            return Math.floor(Math.random() * 5) + 1; // Generates a random number between 1 and 20 (assuming 20 movie objects)
          };
          const getFirstDayOfMonthFormatted = () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth(); // Months are zero-based
            const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
            return formattedDate;
          }
          const getLastDayOfMonthFormatted = () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth(); // Months are zero-based
            const lastDay = new Date(year, month, 0).getDate();
            const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
            return formattedDate;
          }
          const firstDayFormatted = getFirstDayOfMonthFormatted();
          const lastDayFormatted = getLastDayOfMonthFormatted(); 
          
        const randomGenreId = getRandomGenreId();
        const randomMovieObjectNumber = getRandomMovieObjectNumber();
        // const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=spider&api_key=22fbf76ed90f78d0a2e14cff8e62f7bc`)
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&primary_release_date.gte=${firstDayFormatted}&primary_release_date.lte=${lastDayFormatted}&with_genres=${randomGenreId}&sort_by=popularity.desc&page=1&api_key=22fbf76ed90f78d0a2e14cff8e62f7bc`)
        const data = await response.json()
        if (data.results && data.results[randomMovieObjectNumber]) { 
          if (data.results[randomMovieObjectNumber].poster_path == null) {
            setLoading(true)
          }else {
            setHeroMovie(data.results[randomMovieObjectNumber]);
          const fetchedMovieId = data.results[randomMovieObjectNumber].id; // Get the ID of the fetched movie
          fetchCastDetails(fetchedMovieId); // Fetch cast details using the movaaie ID
          setLoading(false);
          }
        }else{
          setLoading(true);
        }
    }
    useEffect(() => {
      getHeroMovie();
    }, [])
    loading
    

    const genreIds = heroMovie?.genre_ids || [];
  const genreNames = getGenreNamesByIds(genreIds);
  const checked = false
  
  return (
    <div className='mt-10 px-5'>
        {heroMovie ? (
            <div className='w-full flex flex-col items-start md:items-center justify-center gap-10 md:flex-row'>
                <div className='w-full sm:px-10 md:w-2/5'>
                    
                          <img className='w-full h-auto' src={`https://image.tmdb.org/t/p/w500${heroMovie.poster_path}`} alt={heroMovie.title} />
                   
                </div>
                <div className=' w-full px-5 sm:pl-10 md:w-3/5'>
                    <Link to={`/movies/${createLinkText(heroMovie.title, heroMovie.id, checked)}`}><h1 className='text-3xl md:text-4xl font-bold text-gray-900 title'>{heroMovie.title}</h1></Link>
                    <br />
                    <p><b>Released:</b> {heroMovie.release_date} <b>Genres:</b> {genreNames.join(', ')}</p>
                    <br />
                    <p className='text-gray-700'>{heroMovie.overview}</p>
                    <br />
                    <p><b>Cast:</b> {actorsData?.slice(0, 7).map((actor) => (
                            <span key={actor.cast_id}>{actor.name}, </span>
                        ))}
                        {actorsData?.length > 7 && '...'}</p>
                </div>
            </div>
        ) : (
          <Loader />
        )
      } 
    </div>
  )
}

export default Hero 