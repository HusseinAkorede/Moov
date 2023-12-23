import React from 'react'
import User from '../assets/User.svg'
import { Loader } from '.'




const CastCard = ({ cast, loading }) => {
  return (
    <div className='text-center'>
      {loading && <Loader />}
      { cast.profile_path !== null ? (
        <img className='rounded-xl w-44 ' src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={ cast.original_name } />
      ) : (
        <img className='rounded-xl w-44 ' src={User} alt='Cast'/>
      )}
      <h2 className='text-black'>{cast.original_name}</h2>
      <p className='text-gray-500'>{cast.character}</p>
    </div>
  )
}

export default CastCard