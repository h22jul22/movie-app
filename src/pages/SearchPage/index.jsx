import { useLocation, useNavigate } from 'react-router-dom';
import axiosIns from '../../api/axios';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import truncate from '../../constant';

const SearchPage = () => {
    // useLocation은 현재 페이지의 URL 정보를 담고 있는 객체를 반환한다. (pathname, search 등)
    const location = useLocation();
    // URLSearchParams 주소창의 경로를 다룰 수 있는 브라우저의 내장 객체
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get('query');
    const debounceSearchQuery = useDebounce(query.get('query'), 500);

    const [searchMovies, setSearchMovies] = useState([]);
    const navigator = useNavigate();

    const fetchSearchMovie = async (searchQuery) => {
        const response = await axiosIns.get(
            `/search/movie?include_adult=false&query=${searchQuery}`
        );
        setSearchMovies(response.data.results);
    };

    useEffect(() => {
        fetchSearchMovie(debounceSearchQuery);
    }, [debounceSearchQuery]);

    if (searchQuery === null) {
        return (
            <div className='mt-20 mb-10 text-center text-lg'>
                <p>제목으로 검색해보세요.</p>
            </div>
        );
    }

    if (searchMovies.length > 0) {
        return (
            <>
                <div className='mt-20 mb-10 text-center text-lg'>
                    <p>{`'${searchQuery}'에 대한 검색 결과입니다.`}</p>
                </div>
                <ul className='grid lg:grid-cols-5 justify-items-center md:grid-cols-3 sm:!grid-cols-1'>
                    {searchMovies.map((movie) => {
                        if (movie.poster_path !== null) {
                            return (
                                <div key={movie.id} onClick={() => navigator(`/${movie.id}`)}>
                                    <div className='flex flex-col items-center w-[200px] mb-12 cursor-pointer'>
                                        <img
                                            className='h-[300px] mb-2 hover:scale-105 hover:duration-100 rounded-lg'
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        />
                                        <div className='text-lg font-bold ml-1'>
                                            {movie.title
                                                ? truncate(movie.title, 13)
                                                : truncate(movie.original_title, 13)}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </ul>
            </>
        );
    } else {
        return (
            <div className='mt-20 mb-10 text-center text-lg'>
                <p>{`'${searchQuery}'에 대한 검색 결과가 없습니다.`}</p>
            </div>
        );
    }
};

export default SearchPage;
