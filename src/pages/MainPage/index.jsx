import MovieCard from '../../components/MovieCard';
import axiosIns from '../../api/axios';
import { useCallback, useEffect, useState } from 'react';
import Banner from '../../components/Banner';

const MainPage = ({ movies }) => {
    // 무한 스크롤 구현하기
    const [moreMovies, setMoreMovies] = useState(movies);
    const [page, setPage] = useState(2);

    const fetchMoreData = useCallback(async () => {
        try {
            const response = await axiosIns.get(`/movie/top_rated?page=${page}`);
            const newMovies = await response.data.results;

            setMoreMovies((prevMovies) => [...prevMovies, ...newMovies]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [page]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight
        ) {
            fetchMoreData();
        }
    }, [fetchMoreData]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    // movies 프롭이 변경될 때마다 moreMovies 상태를 초기화
    useEffect(() => {
        setMoreMovies(movies);
    }, [movies]);

    return (
        <div>
            <div className='mt-20'>
                <ul className='relative'>
                    <Banner />
                </ul>
            </div>
            <div className='container mx-auto mt-14'>
                <ul className='grid gap-8 justify-items-center lg:grid-cols-5 md:grid-cols-3 sm:!grid-cols-1'>
                    {moreMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MainPage;
