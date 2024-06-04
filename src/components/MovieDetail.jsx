import { TiStarFullOutline } from 'react-icons/ti';

const MovieDetail = ({ movieDetail }) => {
    const truncate = (str, n) => {
        return str?.length > n ? str.substring(0, n) + '...' : str;
    };

    return (
        <div className='grid grid-cols-2 justify-center h-full'>
            <div>
                <img
                    className='w-full h-5/6 object-contain'
                    src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                />
            </div>
            <div className='flex flex-col h-5/6 lg:gap-4 md:gap-3 md:mr-8 sm:!gap-0'>
                <div className='flex justify-between items-center mt-12 mb-8 sm:flex-col sm:items-start sm:gap-2 sm:my-8'>
                    <h1 className='lg:text-4xl md:text-3xl sm:!text-2xl font-bold grow'>
                        {movieDetail.title ? movieDetail.title : movieDetail.original_title}
                    </h1>
                    <span className='flex gap-[0.125rem] lg:text-2xl md:text-xl sm:!text-lg w-24'>
                        <TiStarFullOutline className='mt-1' />
                        {movieDetail.vote_average?.toFixed(1)}
                    </span>
                </div>
                <div className='my-4 lg:text-xl md:text-lg sm:!text-base'>
                    장르:{movieDetail.genres?.map((genre) => ' ' + genre.name)}
                </div>
                <div className='my-4 lg:text-xl md:text-lg sm:!hidden'>
                    {truncate(movieDetail.overview, 150)}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
