import MovieCard from '../../components/MovieCard';

const MainPage = ({ movies }) => {
    return (
        <div className='container mx-auto mt-14'>
            <ul className='grid gap-8 lg:grid-cols-5 md:grid-cols-4 sm:!grid-cols-3'>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </ul>
        </div>
    );
};

export default MainPage;
