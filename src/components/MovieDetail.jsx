import { useContext } from 'react';
import { TiHeartOutline, TiHeartFullOutline, TiStarFullOutline } from 'react-icons/ti';
import { UserLikedContext } from '../context/UserLikedContext';
import { useParams } from 'react-router-dom';
import truncate from '../constant';

const MovieDetail = ({ movieDetail }) => {
    const { userData, toggleLike } = useContext(UserLikedContext);
    const { movieId } = useParams();

    const isLikedMovie = userData?.likedMovies?.find((movie) => movie.id === movieId);
    const isLiked = isLikedMovie ? isLikedMovie.isLiked : false;

    const handleToggle = () => {
        if (userData) {
            toggleLike(movieId);
        } else {
            alert('로그인 후 이용해주세요.');
        }
    };

    return (
        <div className='grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 md:max-w-[500px] justify-center mx-auto max-w-[1020px] h-full'>
            <div>
                <img
                    className='h-full object-cover rounded-lg'
                    src={
                        movieDetail.backdrop_path
                            ? `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`
                            : `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
                    }
                />
            </div>
            <div className='flex flex-col px-6'>
                <div className='flex justify-start items-center gap-3 mt-7 mb-10'>
                    <h1 className='font-bold text-[26px]'>
                        {movieDetail.title ? movieDetail.title : movieDetail.original_title}
                    </h1>
                    <div>
                        {!isLiked ? (
                            <TiHeartOutline
                                className='text-3xl animate-bounce cursor-pointer'
                                onClick={handleToggle}
                            />
                        ) : (
                            <TiHeartFullOutline
                                className='text-3xl animate-bounce cursor-pointer'
                                onClick={handleToggle}
                            />
                        )}
                    </div>
                </div>
                <div className='my-3 flex justify-start gap-2 flex-wrap'>
                    <span className='flex gap-[0.125rem] border border-[gold] bg-[gold] text-base px-2 rounded-md'>
                        <TiStarFullOutline className='mt-1' />
                        {movieDetail.vote_average?.toFixed(1)}
                    </span>
                    {movieDetail.genres &&
                        movieDetail.genres.map((genre, index) => (
                            <span
                                className='border border-gray-300 bg-gray-300 text-base px-2 rounded-md'
                                key={index}>
                                {genre.name}
                            </span>
                        ))}
                </div>
                <div className='my-5 text-justify text-lg'>
                    {truncate(movieDetail.overview, 100)}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
