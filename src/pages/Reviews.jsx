import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReviewCard } from '../components';


const Reviews = () => {
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
        <div className='py-10 flex flex-col justify-center mb-10 px-10 w-full bg-slate-300'>
            <h2 className='title'>{generateTitleOrName(movie)}</h2>
            <Link to={`/movies/${linkText}`} className='text-blue-500'> ⬅ Back to Main</Link>
        </div>
        <div className='flex flex-col px-10 smd:px-20 gap-5 smd:gap-10'>
            {
                movie?.reviews.results.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))
            }
        </div>
    </div>
  )
}

export default Reviews