import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { MovieCard, Loader, Switch } from '.';
import { getRandomPageNumber} from '../utils/extraFunctions'



const Upcoming = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [checked, setChecked] = useState(false);



const getLastDayOfMonthFormatted = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // Months are zero-based
  const lastDay = new Date(year, month, 0).getDate();
  const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
  return formattedDate;
}
const lastDayFormatted = getLastDayOfMonthFormatted(); 
  useEffect(() => {
    const getUpcomingMovies = async() => {
      const randomPageNumber = getRandomPageNumber(5);
      // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc&primary_release_date.gte=${lastDayFormatted}&page=${randomPageNumber}`)
      const response = await fetch(` ${ checked ? `https://api.themoviedb.org/3/discover/tv?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc&page=${randomPageNumber}&first_air_date.gte=${lastDayFormatted}` : `https://api.themoviedb.org/3/discover/movie?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc&primary_release_date.gte=${lastDayFormatted}&page=${randomPageNumber}`}`)
      
      const data = await response.json()
        if(data.results){
          setUpcomingMovies(data.results)
          setLoading(false)
        }else{
          setLoading(false)
        }
    }
    getUpcomingMovies()
  }, [checked])
  return (
    <div className='mt-14 px-5 '>
      <h1 className='text-4xl mb-3 font-bold sm:pl-10'>Upcoming { checked ? 'TV Shows' : 'Movies'}</h1>
      <Switch checked={checked} setChecked={setChecked}/>
        <div className='w-full sm:px-10 '>
          
          {upcomingMovies.length === 0 ? (
              <Loader />
          ) : (
            // <Splide options={ {
            //   perMove: 2,
            //   drag: true,
            //   perPage: 5,
            //   snap: false,
            //   focus: 0,
            //   wheel    : true,
            //   pagination: false,
            //   breakpoints: {
            //     375: {
            //       perPage: 1,
            //     },
            //     720: {
            //       perPage: 2,
            //     },
            //     1020: {
            //       perPage: 3,
            //     },
            //     1300: {
            //       perPage: 4,
            //     }
            //   }
            // } }
            // >
            //  {
            //   upcomingMovies.map((movie: Movie) => (
            //     <SplideSlide key={movie.id}>
            //         <MovieCard movie={movie} loading={loading} checked={checked} withSplide={true}/>
            //     </SplideSlide>
            //   ))
            //  }
            // </Splide>
            <Swiper
            effect={'coverflow'}
            grabCursor={true}
              spaceBetween={50}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              loop={true}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              
              modules={[EffectCoverflow, Autoplay]}
              breakpoints={{
                375: {
                  slidesPerView: 1,
                },
                720: {
                  slidesPerView: 2,
                },
                1020: {
                  slidesPerView: 3,
                },
                1300: {
                  slidesPerView: 4,
                }
              }}
            >
              {
              upcomingMovies.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <MovieCard movie={movie} loading={loading} checked={checked} withSplide={true}/>
                </SwiperSlide>
              ))
             }
            </Swiper>
            )
            }
        </div>
    </div>
  )
}

export default Upcoming