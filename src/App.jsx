import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SignUpPage from './pages/SignUpPage';
import { useState, useEffect, useCallback } from 'react';
import axiosIns from './api/axios';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import UserProvider from './context/UserContext';
import UserLikedProvider from './context/UserLikedContext';
import LikedMoviePage from './pages/LikedMoviePage';
import UserSearchProvider from './context/UserSearchContext';

function App() {
    const [movies, setMovies] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await axiosIns.get('/movie/top_rated');
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <UserProvider>
            <UserLikedProvider>
                <UserSearchProvider>
                    <Routes>
                        <Route path='/' element={<Layout />}>
                            <Route index element={<MainPage movies={movies} />} />
                            <Route path=':movieId' element={<DetailPage />} />
                            <Route path='signUp' element={<SignUpPage />} />
                            <Route path='login' element={<LoginPage />} />
                            <Route path='search' element={<SearchPage />} />
                            <Route path='likeList' element={<LikedMoviePage />} />
                        </Route>
                    </Routes>
                </UserSearchProvider>
            </UserLikedProvider>
        </UserProvider>
    );
}

export default App;
