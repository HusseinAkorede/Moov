import { CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <div className="flex flex-col h-96 gap-8 w-full   items-center justify-center">
        <CircularProgress />
        <h1 className='text-xl'>Loading...</h1>
    </div>
  )
}

export default Loader