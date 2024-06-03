import MovieDetail from '../../components/MovieDetail';

const DetailPage = ({ movieDetail }) => {
    return (
        <div className='mx-20 my-8'>
            <MovieDetail movieDetail={movieDetail} />
        </div>
    );
};

export default DetailPage;
