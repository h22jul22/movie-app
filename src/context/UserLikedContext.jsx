import { createContext, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

export const UserLikedContext = createContext();

const UserLikedProvider = ({ children }) => {
    const { userData, setUserData } = useContext(UserContext);
    const navigator = useNavigate();

    const toggleLike = (movieId) => {
        setUserData((prevUserData) => {
            // 관심영화목록 가져오기
            const userLikedMovies = prevUserData.likedMovies || [];
            // 해당 영화가 저장소에 있는지 체크
            const index = userLikedMovies.findIndex((movie) => movie.id === movieId);
            // 있는 경우
            if (index !== -1) {
                const updateUserLikeMovies = [...userLikedMovies];
                updateUserLikeMovies[index].isLiked = !updateUserLikeMovies[index].isLiked;
                return { ...prevUserData, likedMovies: updateUserLikeMovies };
            }

            // 없는 경우
            const newLikedMovies = [...userLikedMovies, { id: movieId, isLiked: true }];
            return { ...prevUserData, likedMovies: newLikedMovies };
        });

        const answer = confirm('관심목록으로 이동하시겠습니까?');
        if (answer) {
            navigator('/likeList');
        } else {
            return;
        }
    };

    return (
        <UserLikedContext.Provider value={{ userData, toggleLike }}>
            {children}
        </UserLikedContext.Provider>
    );
};

export default UserLikedProvider;
