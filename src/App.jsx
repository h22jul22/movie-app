import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SignUpPage from './pages/SignUpPage';
import { useState, useEffect, useCallback } from 'react';
import axiosIns from './api/axios';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';

function App() {
    const [movies, setMovies] = useState([]);

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
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<MainPage movies={movies} />} />
                    <Route path=':movieId' element={<DetailPage />} />
                    <Route path='signUp' element={<SignUpPage />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='search' element={<SearchPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
