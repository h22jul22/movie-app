import { TiStarFullOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const navigator = useNavigate();

    const moveToDetail = () => {
        navigator('/details');
    };

    return (
        <div className='flex flex-col mb-4 cursor-pointer' onClick={moveToDetail}>
            <img
                className='h-[300px] mb-2'
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            />
            <h2 className='text-lg font-bold ml-1'>{movie.title}</h2>
            <div className='flex self-end gap-[0.125rem] mr-2'>
                <TiStarFullOutline className='mt-1' />
                {movie.vote_average.toFixed(1)}
            </div>
        </div>
    );
};

export default MovieCard;
