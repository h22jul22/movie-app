import { TiStarFullOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import truncate from '../constant';

const MovieCard = ({ movie }) => {
    const navigator = useNavigate();

    const moveToDetail = () => {
        navigator(`/${movie.id}`);
    };

    return (
        <div
            className='flex flex-col mb-4 w-[200px] sm:!w-[260px] cursor-pointer'
            onClick={moveToDetail}>
            <img
                className='h-[300px] sm:!h-[390px] mb-2 hover:scale-105 hover:duration-100 rounded-lg'
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            />
            <h2 className='text-lg font-bold ml-1'>
                {movie.title ? truncate(movie.title, 12) : truncate(movie.original_title, 12)}
            </h2>
            <div className='flex self-end gap-[0.125rem] mr-2'>
                <TiStarFullOutline className='mt-1' />
                {movie.vote_average.toFixed(1)}
            </div>
        </div>
    );
};

export default MovieCard;
