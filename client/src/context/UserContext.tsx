import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextProps {
    userId: string | null;
}

const UserContext = createContext<UserContextProps>({
    userId: null,
});

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({children}: any) => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            if(decodedToken){
                setUserId(decodedToken.id);
            }
        }
    }, []);

    

    return (
        <UserContext.Provider value={{userId}}>
            {children}
        </UserContext.Provider>
    )
}

