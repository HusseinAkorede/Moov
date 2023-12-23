import { Hero, Popular, Upcoming, TopRated } from '../components'


const Home = () => {
  return (
    <div className='w-full max-w-[1300px] m-auto py-5'>
      <Hero />
      <Popular />
      <Upcoming />
      <TopRated />
    </div>
  )
}

export default Home