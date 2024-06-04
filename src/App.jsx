import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SignUpPage from './pages/SignUpPage';
import { useState, useEffect } from 'react';
import axiosIns from './api/axios';
import Login from './pages/LoginPage';

function App() {
    const [movies, setMovies] = useState([]);

    const fetchData = async () => {
        const response = await axiosIns.get('/movie/popular');
        setMovies(response.data.results);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<MainPage movies={movies} />} />
                    <Route path=':movieId' element={<DetailPage />} />
                    <Route path='signUp' element={<SignUpPage />} />
                    <Route path='login' element={<Login />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
