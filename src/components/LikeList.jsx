import { useContext, useEffect, useState } from 'react';
import { TiHeartFullOutline } from 'react-icons/ti';
import { UserLikedContext } from '../context/UserLikedContext';
import axiosIns from '../api/axios';
import { useNavigate } from 'react-router-dom';
import truncate from '../constant';

const LikeList = () => {
    const { likeMovies } = useContext(UserLikedContext);
    const [movieDetail, setMovieDetail] = useState([]);
    const navigator = useNavigate();

    const fetchMovieDetails = async () => {
        // Promise.all은 모든 Promise가 완료될 때까지 기다렸다가 결과를 배열로 반환한다.
        const response = await Promise.all(
            likeMovies
                .filter((movie) => movie.isLiked === true)
                .map((movie) => axiosIns.get(`/movie/${movie.id}`))
        );
        const data = await response.map((response) => response.data);
        setMovieDetail(data);
    };

    useEffect(() => {
        if (likeMovies) {
            fetchMovieDetails();
        }
    }, [likeMovies]);

    return (
        <section className='mx-auto max-w-[1080px] md:max-w-[680px] sm:!w-[330px]'>
            <fieldset className='border-2 border-black rounded-3xl text-center'>
                <legend className='flex justify-center items-center gap-2 p-6 text-2xl font-semibold'>
                    내 관심목록 <TiHeartFullOutline className='animate-bounce text-3xl' />
                </legend>
                <ul className='p-6 flex justify-center flex-wrap'>
                    {movieDetail.map((movie) => (
                        <div key={movie.id} className='w-[180px] mb-8 mx-8 flex flex-col gap-3'>
                            <img
                                className='rounded-lg h-[250px] hover:scale-105 hover:duration-100'
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                onClick={() => navigator(`/${movie.id}`)}
                            />
                            <h2 className='text-md font-bold'>
                                {movie.title
                                    ? truncate(movie.title, 30)
                                    : truncate(movie.original_title, 30)}
                            </h2>
                        </div>
                    ))}
                </ul>
            </fieldset>
        </section>
    );
};

export default LikeList;
