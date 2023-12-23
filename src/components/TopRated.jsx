import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { MovieCard, Loader, Switch } from '.';
import { getRandomPageNumber} from '../utils/extraFunctions'

const TopRated = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [checked, setChecked] = useState(false);


  useEffect(() => {
    const getTopRatedMovies = async() => {
      const randomPageNumber = getRandomPageNumber(10);
      const response = await fetch(` ${ checked ? `https://api.themoviedb.org/3/tv/top_rated?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc&page=${randomPageNumber}` : `https://api.themoviedb.org/3/movie/top_rated?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc&page=${randomPageNumber}`}`)
      const data = await response.json()
        if(data.results){
          setTopRatedMovies(data.results)
          setLoading(false)
        }else{
          setLoading(false)
        }
    }
    getTopRatedMovies()
  }, [checked])
  return (
    <div className='mt-14 px-5'>
      <h1 className='text-4xl mb-3 font-bold sm:pl-10'>Top Rated { checked ? 'TV Shows' : 'Movies'}</h1>
      <Switch checked={checked} setChecked={setChecked}/>
        <div className='w-full sm:px-10 '>
          
          {topRatedMovies.length === 0 ? (
              <Loader />
          ) : (
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
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              loop={true}
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
              topRatedMovies.map((movie) => (
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

export default TopRated