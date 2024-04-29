import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { clientAuth, clientUser } from "../client/client";

interface AuthContextType {
    authState?: { token: string | null, authenticated: boolean | null };
    onRegister?: (email: string, password: string,name: string ) => Promise<any>;
    onLogin?: (email: string, password: string ) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({});

export const useAuth = () => {
    return useContext(AuthContext); 
}

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null }>
    ({ token: null, authenticated: null });

    useEffect(() => {
        const LoadToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setAuthState({ token, authenticated: true });
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
        LoadToken();
    }, []);

    const onLogin = async (email: string, password: string) => {
        try{
            const result = await clientAuth.post('/login', { email, password });
            if(!result.data.token){
                throw new Error('Token not found');
            }
            setAuthState({ token: result.data.token, authenticated: true });
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;


            localStorage.setItem('token', result.data.token);
            return {
                error: false,
                message: 'Register success',
            }
        }catch(e){
            return {
                error: true,
                message: e,
            }
        }
    }

    const onLogout = async () => {
        try{
            setAuthState({ token: null, authenticated: false });
            axios.defaults.headers.common['Authorization'] = '';
            localStorage.removeItem('token');
            return {
                error: false,
                message: 'Logout success',
            }
        }catch(e){
            return {
                error: true,
                message: e,
            }
        }
    }

    const onRegister = async (email: string, password: string, name: string) => {
        try{    
            return await clientUser.post('/', { email, password, name });
        }catch(e){
            return {
                error: true,
                message: e,
            }
        }
    }

    const value = {
        authState,
        onRegister,
        onLogin,
        onLogout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;


};