import { createContext, useState } from 'react';

export const UserLikedContext = createContext();

const UserLikedProvider = ({ children }) => {
    const [likeMovies, setLikeMovies] = useState(
        localStorage.getItem('UserLikedMovies')
            ? JSON.parse(localStorage.getItem('UserLikedMovies'))
            : []
    );

    const toggleLike = (movieId) => {
        setLikeMovies((prevLikedMovies) => {
            // 해당 영화가 저장소에 있는지 체크
            const index = prevLikedMovies.findIndex((movie) => movie.id === movieId);
            // 이미 있을 경우
            if (index !== -1) {
                const updateLikedMovies = [...prevLikedMovies];
                updateLikedMovies[index].isLiked = !updateLikedMovies[index].isLiked;
                localStorage.setItem('UserLikedMovies', JSON.stringify(updateLikedMovies));

                return updateLikedMovies;
            }

            // 없는 경우
            const newLikedMovies = [...prevLikedMovies, { id: movieId, isLiked: true }];
            localStorage.setItem('UserLikedMovies', JSON.stringify(newLikedMovies));

            return newLikedMovies;
        });
    };

    return (
        <UserLikedContext.Provider value={{ likeMovies, toggleLike }}>
            {children}
        </UserLikedContext.Provider>
    );
};

export default UserLikedProvider;
