import { useCallback, useEffect, useState } from 'react';
import axiosIns from '../api/axios';
import useEmblaCarousel from 'embla-carousel-react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const [movies, setMovies] = useState([]);
    const navigator = useNavigate();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'center',
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 1 },
            '(min-width: 769px) and (max-width: 1020px)': { slidesToScroll: 2 },
            '(min-width: 1021px) and (max-width: 1440px)': { slidesToScroll: 3 },
            '(min-width: 1441px)': { slidesToScroll: 4 },
        },
    });

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes()); // Access API
        }
    }, [emblaApi]);

    const fetchData = useCallback(async () => {
        try {
            const response = await axiosIns.get('/movie/popular');
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className='embla'>
            <div className='embla__viewport overflow-hidden' ref={emblaRef}>
                <div className='embla__container flex p-[10px] sm:gap-4'>
                    {movies.map((movie, index) => (
                        <div
                            className='embla__slide flex-none w-full sm:!w-1/2 md:w-1/3 lg:w-1/4 xl:!w-1/5 p-2 relative ml-28 sm:!ml-12 hover:scale-105 hover:duration-100'
                            key={movie.id}>
                            <span className='absolute top-[50%] -left-9 md:-left-8 sm:!-left-6 drop-shadow-3xl font-poppins text-white text-[180px] md:text-[160px] sm:!text-[140px] font-bold opacity-90'>
                                {index + 1}
                            </span>
                            <img
                                className='h-[450px] md:h-[400px] sm:!h-[350px] rounded-3xl !min-w-[200px]'
                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                onClick={() => navigator(`/${movie.id}`)}></img>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
