import MovieCard from '../../components/MovieCard';

const MainPage = ({ movies }) => {
    return (
        <div className='m-8'>
            <ul className='grid grid-cols-5 gap-8'>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </ul>
        </div>
    );
};

export default MainPage;
