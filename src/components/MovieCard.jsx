import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { createLinkText } from '../utils/extraFunctions'


const MovieCard = ({ movie, loading, checked, withSplide }) => {
  
  const [replImage, setReplImage] = useState()

  if (loading) {
    return <div className='p-2'>Loading...</div>;
  }
  const generateTitleOrName = (movie) => {
    if (movie.title) {
      return movie.title;
    } else {
      return movie.name;
    }
  }
  const generateReleaseOrAiring = (movie) => {
    if (movie.release_date) {
      return movie.release_date;
    } else {
      return movie.first_air_date;
    }
  }

  const getReplImage = async() => { 
    const response = await fetch('https://picsum.photos/400/500');
    const imageBlob = await response.blob();
    const image = URL.createObjectURL(imageBlob);
    setReplImage(image);
    // console.log(image)
   }

   useEffect(() => {
    getReplImage()
  }, [])
  //  const ReplImage: any = getReplImage()
  return (
    <div className='p-2 ' >
          <div className={ ` rounded-xl overflow-hidden  h-full ${withSplide ? 'w-64' : 'w-64'} `}>
            <div
            className="w-full h-72 obje object-center "
            >
                { movie.poster_path == null ? (<img className='w-full h-full' src={replImage} alt={movie.title} />) : (<img className='w-full h-full ' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />)}
            </div>
            <div className="px-4 py-4 w-full bg-[#0B3C49] ">
              <Link to={`/movies/${createLinkText( generateTitleOrName(movie) , movie.id, checked)}`}><h2 className="text-white text-lg font-bold truncate-overflow hover:text-[#0ACDFF]">{generateTitleOrName(movie)}</h2></Link>
              <p className="text-white">{generateReleaseOrAiring(movie) ? generateReleaseOrAiring(movie) : 'Unknown Date'}</p>
            </div>
          </div>
    </div>
  )
}

export default MovieCard