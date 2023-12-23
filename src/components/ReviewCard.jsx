import Star from '../assets/star.png'
import Ruser from '../assets/Ruser.png'

  
  // Functions
  const formatRating = (rating) => {
    if (rating === undefined || rating === null) {
      return '';
    }
    const parsedRating = parseFloat(rating);
    return parsedRating.toFixed(1); // Formats to 1 decimal place
  };
  
  const formatDate = (dateString) => {
    if (!dateString) {
      return '';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const truncateStringByWordCount = (inputString, maxWords) => {
    if (!inputString) {
      return '';
    }
    const words = inputString.split(' ');
  
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' ...'; // Adding ellipsis to indicate truncated content
    }
  
    return inputString;
  };
const ReviewCard = ( { review } ) => {
  return (
    <div className='shadow-md p-5 rounded-xl'>
        <div className="flex smd:flex-row flex-col smd:text-left text-center items-center gap-5">
            <div className="rounded-[100%] w-16 h-16 overflow-hidden">
                { review?.author_details.avatar_path == null ? <img className='w-full h-full' src={Ruser} /> : <img className='w-full h-full' src={`https://image.tmdb.org/t/p/w500${review?.author_details.avatar_path}`}/>}
            </div>
            <div>
                <a href={review?.url} target="_blank" className="text-lg font-bold">A Review from {review?.author}</a>
                <div className='flex items-center gap-3 smd:flex-row flex-col smd:text-left text-center mt-1 smd:mt-0'>
                    <div className='flex items-center gap-2 text-white font-semibold p-[3px] rounded-lg bg-black w-16 justify-center'>
                        <img src={Star} className='w-4'/>
                        <p className="text-sm font-light">{formatRating(review?.author_details.rating)}</p>
                    </div>
                    <div>
                        <p>
                            Written by {review?.author} on {formatDate(review?.updated_at)}
                        </p>
                    </div>
                </div>

            </div>
        </div>
        <div className='mt-3'>
            <p>
                {truncateStringByWordCount(review?.content, 100)}
                { review?.content.split(' ').length && review?.content.split(' ').length > 100 ? (<a href={review?.url} target="_blank" className="text-blue-500">Read More</a>) : ''}
                
            </p>
        </div>
    </div>
  )
}

export default ReviewCard