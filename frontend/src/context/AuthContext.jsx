import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../utils/api";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const {data} = await api.post('/auth/login', {username, password});
            // console.log(data);
            setUser(data.user);
            Cookies.set('authToken', data.token);
        } catch (error) {
            console.log(error);
            throw new Error(error.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const register = async (username, email, password) => {
        setLoading(true)
        try {
            const {data} = await api.post('/auth/register', {username, email, password});
            console.log(data);
            setUser(data.newUser);
            Cookies.set('authToken', data.token);
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
       try {
         await api.post('/auth/logout');
         setUser(null);
         Cookies.remove('authToken');
       } catch (error) {
            throw new Error('Logout failed')
       } finally {
            setLoading(false);
       }
    };

    const fetchUser = async () => {
        const token = Cookies.get('authToken');
        console.log(token);
        if(!token){
            try {
                const {data} = await api.get('/auth');
                console.log(data);
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    },[]);

    return (
        <AuthContext.Provider value={{user, login, register, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthProvider, AuthContext};
