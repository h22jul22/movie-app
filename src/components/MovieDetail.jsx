import { TiStarFullOutline } from 'react-icons/ti';

const MovieDetail = ({ movieDetail }) => {
    return (
        <div className='grid grid-cols-2 justify-center gap-8'>
            <div>
                <img
                    className='w-full h-full'
                    src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                />
            </div>
            <div className='flex flex-col gap-12'>
                <div className='flex flex-row justify-between items-center my-12'>
                    <h1 className='text-5xl font-bold grow'>{movieDetail.title}</h1>
                    <span className='flex gap-[0.125rem] text-2xl w-24'>
                        <TiStarFullOutline className='mt-1' />
                        {movieDetail.vote_average.toFixed(1)}
                    </span>
                </div>
                <div className='text-2xl'>
                    장르: {movieDetail.genres.map((genre) => genre.name + ' ')}
                </div>
                <div className='text-xl'>{movieDetail.overview}</div>
            </div>
        </div>
    );
};

export default MovieDetail;
