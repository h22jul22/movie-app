import { useContext } from 'react';
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import { UserLikedContext } from '../context/UserLikedContext';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import truncate from '../constant';

const MovieDetail = ({ movieDetail }) => {
    const { likeMovies, toggleLike } = useContext(UserLikedContext);
    const { movieId } = useParams();
    const { userData } = useContext(UserContext);

    const isLikedMovie = likeMovies.find((movie) => movie.id === movieId);
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
                    src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`}
                />
            </div>
            <div className='flex flex-col px-6'>
                <div className='flex justify-between items-center my-8'>
                    <h1 className='grow font-bold text-2xl'>
                        {movieDetail.title ? movieDetail.title : movieDetail.original_title}
                    </h1>
                    <span className='flex gap-[0.2rem] text-xl'>
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
                        {movieDetail.vote_average?.toFixed(1)}
                    </span>
                </div>
                <div className='my-3 text-lg'>
                    장르:{movieDetail.genres?.map((genre) => ' ' + genre.name)}
                </div>
                <div className='my-5 text-justify text-lg'>
                    {truncate(movieDetail.overview, 100)}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
