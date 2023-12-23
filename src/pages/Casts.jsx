import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Ruser from '../assets/Ruser.png'

const Casts = () => {
  const { linkText } = useParams()
  let id; // Declare id outside the conditional block

    if (linkText) {
      const splitId = linkText.split('-');
      id = splitId.slice(-1)[0]; // Assign id if keywordID is defined
    } else {
      // Handle the case where keywordID is undefined
      id = undefined; // You can assign a default value here if needed
    }
  const [movie, setMovie] = useState();
  const getTypeFromLink = (link) => {
    if (!link) {
      return ''; // Return a default value if link is undefined
    }
  
    const linkParts = link.split('-');
    const type = linkParts[0]; // Access the first element after splitting
  
    return type;
  };
  const type = getTypeFromLink(linkText);
  const getMovie = async() => {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc&append_to_response=videos,credits,keywords,reviews,budget`);
    const data = await response.json();
    if (data) {
        setMovie(data);
    }
  }
  const generateTitleOrName = (movie) => {
    if (movie?.title) {
      return movie.title;
    } else {
      return movie?.name;
    }
  }
  useEffect(() => {
    getMovie()
  }, [])
  return (
    <div>
      <div className='py-10 flex flex-col justify-center px-10 w-full bg-slate-300'>
        <h2 className='title'>{generateTitleOrName(movie)}</h2>
        <Link to={`/movies/${linkText}`} className='text-blue-500'> ⬅ Back to Main</Link>
      </div>
      <div className='flex smd:px-20 smd:flex-row flex-col px-10  gap-10 my-10'>
        <div className='flex-1 '>
          <h2 className='text-2xl font-bold mb-6'>Casts:</h2>
          <div className='flex flex-col gap-5'>
            {
              movie?.credits.cast.map((cast) => (
                <div key={cast.id} className='flex gap-4'>
                  { cast.profile_path == null 
                    ? ( <img className='w-20 h-20 rounded-lg object-cover object-bottom bg-[#556080]' src={Ruser} /> ) 
                    : ( <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.original_name} className='w-20 h-20 rounded-lg object-cover ' /> ) 
                  }
                  
                  <div className='flex flex-col justify-center'>
                    <p className='text-xl font-bold'>{cast.character}</p>
                    <p className='text-sm'>{cast.original_name}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='flex-1 '>
          <h2 className='text-2xl font-bold mb-6'>Crew:</h2>
          <div className='flex flex-col gap-5'>
          {
              movie?.credits.crew.map((crew) => (
                <div key={crew.id} className='flex gap-4'>
                  { crew.profile_path == null 
                    ? ( <img className='w-20 h-20 rounded-lg object-cover object-bottom bg-[#556080]' src={Ruser} /> ) 
                    : ( <img src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`} alt={crew.original_name} className='w-20 h-20 rounded-lg object-cover ' /> ) 
                  }
                  
                  <div className='flex flex-col justify-center'>
                    <p className='text-xl font-bold'>{crew.original_name}</p>
                    <p className='text-sm'>{crew.job}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Casts