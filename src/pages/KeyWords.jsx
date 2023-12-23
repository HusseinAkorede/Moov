import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../components';


const KeyWords = () => {
  const { keywordID } = useParams();

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [nextMovies, setNextMovies] = useState();
  
  const dataRef = useRef(undefined);

  let id // Declare id outside the conditional block

  if (keywordID) {
    const splitId = keywordID.split('-');
    id = splitId.slice(-1)[0]; // Assign id if keywordID is defined
  } else {
    // Handle the case where keywordID is undefined
    id = undefined; // You can assign a default value here if needed
  }

  useEffect(() => {
    const getKeyWordMoviesOrTV = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/keyword/${id}/movies?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc`);
        const data = await response.json();

        if (data.results) {
          setMovies(data.results);
          setLoading(false);
          dataRef.current = data;
        } else {
          setLoading(true);
        }
      } catch (error) {
        setLoading(true);
      }
    };

    getKeyWordMoviesOrTV();
  }, [id]);

  const getNextPage = async () => {
    if (dataRef.current?.total_pages === undefined || dataRef.current?.page === undefined) {
      return;
    }

    if (dataRef.current.total_pages > dataRef.current.page) {
        const response = await fetch(`https://api.themoviedb.org/3/keyword/${id}/movies?api_key=22fbf76ed90f78d0a2e14cff8e62f7bc&page=${dataRef.current.page + 1}`);
        const data = await response.json();

        if (data.results) {
          setNextMovies(data.results);
          setMovies(prevMovies => [...prevMovies, ...data.results]);
          setLoading(false);
          dataRef.current = data;
        } else {
          setLoading(true);
        }
    }
  };

  const sliceKeyWordName = (str) => {
    const [, term] = str.split('-');
    return term || '';
  };

  return (
    <div className='px-5 md:px-10 '>
      <h2 className='text-3xl font-bold text-center my-6'> Movies About {keywordID ? sliceKeyWordName(keywordID) : ''}</h2>
      <div className=''>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='flex flex-wrap'>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} loading={loading} checked={false} withSplide={false} />
            ))}
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
  );
};

export default KeyWords;
