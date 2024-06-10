import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(
        localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'))
    );

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
        if (userData === null) {
            localStorage.removeItem('userData');
        }
    }, [userData]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
