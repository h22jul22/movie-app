import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserSearchContext = createContext();

const UserSearchProvider = ({ children }) => {
    const [isClicked, setIsClicked] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        if (isClicked) {
            navigator('/search');
        }
    }, [isClicked]);

    return (
        <UserSearchContext.Provider value={{ isClicked, setIsClicked }}>
            {children}
        </UserSearchContext.Provider>
    );
};

export default UserSearchProvider;
