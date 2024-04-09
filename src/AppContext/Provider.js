import React ,{ useCallback, useState } from 'react'
import AppContext from "./Context";
import api from "../services/api";

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userLocalStorage = localStorage.getItem('user');
        if(userLocalStorage) {
            return JSON.parse(userLocalStorage);
        }
        return null;
    });
    const [token, setToken] = useState(() => {
        const userLocalStorage = localStorage.getItem('token');
        if(userLocalStorage) {
            return userLocalStorage;
        }
        return null;
    });

    const sign = useCallback((email, password) => {
        api.post('/sessions', {
            email,
            password
        }).then(response => {
            const { user, token } = response.data;
            setUser(user);
            setToken(token);

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        });
    }, []);

    const signOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
        setUser(null);
        setToken(null);
    }

    return (
        <AppContext.Provider value={{sign, signOut, user, token}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;