import { useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader, CastCard, ReviewCard } from '../components'
import { ArraySlicer } from '../utils/extraFunctions'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const MovieDetails = () => {
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
    const [loading, setLoading] = useState(false);
    const [replImage, setReplImage] = useState()
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
      } else {  
        setLoading(true)
      }
    }
    const generateTitleOrName = (movie) => {
      if (movie?.title) {
        return movie.title;
      } else {
        return movie?.name;
      }
    }
    const generateReleaseOrAiring = (movie) => {
      if (movie?.release_date) {
        return movie.release_date;
      } else {
        return movie?.first_air_date;
      }
    }
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };
    useEffect(() => {
      getMovie()
    }, [])
    const getReplImage = async() => { 
      const response = await fetch('https://picsum.photos/400/500');
      const imageBlob = await response.blob();
      const image = URL.createObjectURL(imageBlob);
      setReplImage(image);
     }
     useEffect(() => {
      getReplImage()
    }, [])
    const castArray = ArraySlicer(movie?.credits.cast)

    function truncateStringByWordCount(overview) {
      const words = overview.split(' '); // Split the string into an array of words
      if (words.length > 50) {
        return true// Join the limited words back into a string
      }
      return false;
    }
    const isOverviewLong = truncateStringByWordCount(movie?.overview || '')
    const reviewsArr = movie?.reviews.results.slice(0, 2)  ?? [];
    const firstTrailer = movie?.videos.results.find(movie => movie.type == 'Trailer');
  return (
    
    <div>
      {
            loading ? (
              <Loader />
            ) : (
      <div>
        <div className='w-full relative'>
          <div className='relative'>
            <div className='w-full h-full bg-[#9F7E69] absolute opacity-60'></div>
            { movie?.backdrop_path == null ? (
              <img className='w-full h-[55rem] object-cover' src={replImage} alt={movie?.title} />
            ) : (
              <img src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`} className={`w-full  ${isOverviewLong ? 'md:h-[50rem] h-[65rem]': 'h-[52rem]'} object-cover object-top`} alt={movie?.title} />
            )}
          </div>
          <div className='absolute top-0 w-full h-full flex items-center justify-center px-5 sm:px-32 '>
            <div className='flex flex-col gap-5 sm:gap-10   justify-center md:flex-row text-center md:text-left items-center text-white'>
              { movie?.poster_path == null ? (
                <img className='md:h-[30rem] h-72 w-56 md:w-auto' src={replImage} alt={movie?.title} />
              ) : (
                <img className='md:h-[30rem] h-72 w-56 md:w-auto ' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie?.title} />
              )}
              <div>
                  <h2 className='title'>{generateTitleOrName(movie)}</h2>
                <br />
                <p><b>Released:</b> {formatDate(generateReleaseOrAiring(movie))} <b>Genres:</b> {movie?.genres.map((genre) => genre.name).join(', ')} </p>
                <br />
                <p>{movie?.tagline} <a className='text-blue-500 hover:text-blue-900' target='_blank' href={`https://www.youtube.com/watch?v=${firstTrailer?.key}`}>▶ Watch Trailer</a></p>
                <br />
                <p>{movie?.overview }</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex-col  lg:flex-row max-w-[1300px] m-auto px-2 py-8 flex gap-8 items-center justify-center'>
          <div className='w-[80%]'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold mb-6'>Casts:</h2>
            <Link to={`/movies/${linkText}/casts`} className='text-blue-500 underline'>{(movie?.credits?.cast?.length ?? 0) > 9 ? 'See All' : null}</Link>
          </div>
            <div className='px-2'>
              <Swiper
                grabCursor={true}
                spaceBetween={50}
                autoplay={true}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                        },
                        720: {
                          slidesPerView: 3,
                        },
                        1020: {
                          slidesPerView: 4,
                        },
                        1300: {
                          slidesPerView: 5,
                        }
                }}
              >
                { castArray.length > 1 ?
                  castArray.map((cast) => (
                    <SwiperSlide className='' key={cast.id}>
                      <CastCard key={cast.id} cast={cast} loading={loading}/>
                    </SwiperSlide>
                  )) : (<p>Unknown Casts</p>)
                }
              </Swiper>
              <Link to={`/movies/${linkText}/casts`} className='font-bold text-black hover:text-gray-400 '>{ movie?.credits.cast.length ? 'Full Cast & Crew' : ''}</Link>
            </div>
          </div>
          <div className='lg:w-[20%] w-[80%] flex-wrap  flex flex-row lg:flex-col gap-3 items-start justify-between'>
            <div>
              <p className='text-[1em] font-medium'>Status</p>
              <p className='font-light'>{movie?.status}</p>
            </div>
            <div>
              <p className='text-[1em] font-medium'>Original Language</p>
              <p className='font-light'>{movie?.original_language.toUpperCase()}</p>
            </div>
            <div>
              <p className='text-[1em] font-medium'>Budget</p>
              <p className='font-light'>${movie?.budget == 0 || movie?.budget == undefined ? '-' : movie?.budget.toLocaleString()}</p>
            </div>
            <div>
              <p className='text-[1em] font-medium'>Revenue</p>
              <p className='font-light'>${movie?.revenue == 0 || movie?.revenue == undefined ? '-' : movie?.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className='w-full flex-col  lg:flex-row max-w-[1300px] m-auto px-2 py-8 flex gap-8 items-center justify-center'>
          <div className='w-[80%]'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold mb-6'>Reviews</h2>
          </div>
            <div className='px-2'>
              <div className='mb-2'>
              {!movie?.reviews?.results || movie?.reviews.results === undefined || movie?.reviews.results.length === 0
                ? (
                  <p className='text-[1em] font-medium'>No Reviews</p>
                ) : (
                  reviewsArr.map((review) => (
                    <div className='mb-5'>
                      <ReviewCard key={review.id} review={review} />
                    </div>
                  ))
                )
              }
              </div>
              <Link to={`/movies/${linkText}/reviews`} className='font-bold text-black hover:text-gray-400'>{movie?.reviews.results.length === 0 ? '' : 'Real All Reviews'}</Link>
            </div>
          </div>
          <div className='lg:w-[20%] w-[80%] flex-wrap  flex flex-row lg:flex-col gap-3 items-start justify-between'>
          <h2 className='text-2xl font-bold mb-6'>Keywords</h2>
           <div className='flex flex-wrap gap-2 rounded-xl '>
           {movie?.keywords ? (
              Array.isArray((movie.keywords).keywords) ? (
                (movie.keywords).keywords?.map((keyword) => (
                  <div className='bg-slate-300 p-2 rounded-xl border-black border-2 border-solid' key={keyword.id}>
                    <Link to={`/keyword/${type}-${keyword.name}-${keyword.id}`} className='text-[1em] font-medium'>{keyword.name}</Link>
                  </div>
                ))
              ) : (
                (movie.keywords).results?.map((keyword) => (
                  <div className='bg-slate-300 p-2 rounded-xl border-black border-2 border-solid' key={keyword.id}>
                    <Link to={`/keyword/${type}-${keyword.name}-${keyword.id}`} className='text-[1em] font-medium'>{keyword.name}</Link>
                  </div>
                ))
              )
            ) : null}
           </div>
          </div>
        </div>
      </div>
        )
      }
    </div>
  )
}

export default MovieDetails