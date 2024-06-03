import { TiStarFullOutline } from 'react-icons/ti';

const MovieDetail = ({ movieDetail }) => {
    const truncate = (str, n) => {
        return str?.length > n ? str.substring(0, n) + '...' : str;
    };

    return (
        <div className='grid grid-cols-2 justify-center gap-12 h-full'>
            <div>
                <img
                    className='w-full h-5/6'
                    src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                />
            </div>
            <div className='flex flex-col gap-4 h-5/6'>
                <div className='flex flex-row justify-between items-center mt-12 mb-8'>
                    <h1 className='text-5xl font-bold grow'>{movieDetail.title}</h1>
                    <span className='flex gap-[0.125rem] text-2xl w-24'>
                        <TiStarFullOutline className='mt-1' />
                        {movieDetail.vote_average.toFixed(1)}
                    </span>
                </div>
                <div className='text-xl my-4'>
                    장르: {movieDetail.genres.map((genre) => genre.name + ' ')}
                </div>
                <div className='text-xl my-4'>{truncate(movieDetail.overview, 150)}</div>
            </div>
        </div>
    );
};

export default MovieDetail;
