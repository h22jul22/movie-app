import MovieDetail from '../../components/MovieDetail';
import { useParams } from 'react-router-dom';
import axiosIns from '../../api/axios';
import { useEffect, useState } from 'react';

const DetailPage = () => {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState([]);

    const fetchDetailData = async () => {
        const response = await axiosIns.get(`/movie/${movieId}`);
        setMovieDetail(response.data);
    };

    useEffect(() => {
        fetchDetailData();
    }, []);

    return (
        <div className='mt-20 w-screen'>
            <MovieDetail movieDetail={movieDetail} />
        </div>
    );
};

export default DetailPage;
