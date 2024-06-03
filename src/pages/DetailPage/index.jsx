import MovieDetail from '../../components/MovieDetail';

const DetailPage = ({ movieDetail }) => {
    return (
        <div className='m-8'>
            <MovieDetail movieDetail={movieDetail} />
        </div>
    );
};

export default DetailPage;
