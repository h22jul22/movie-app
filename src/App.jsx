import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import movieListData from './data/movieListData.json';
import movieDetailData from './data/movieDetailData.json';
// import { useState, useEffect } from 'react';

function App() {
    //   const [movies, setMovies] = useState([]);
    // const [movieDetail, setMovieDetail] = useState({});

    //   useEffect(() => {
    //       if (movieListData.results) {
    //           setMovies(movieListData.results);
    //           setMovieDetail(movieDetailData);
    //       }
    //   }, []);

    const movies = movieListData.results;
    const movieDetail = movieDetailData;

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<MainPage movies={movies} />} />
                    <Route path='details' element={<DetailPage movieDetail={movieDetail} />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
