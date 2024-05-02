import { jwtDecode } from "jwt-decode";

type jwtPayload = {
    id: string;
    iat: number;
    exp: number;
} 

export const getId = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        const decodedToken: jwtPayload = jwtDecode(token);
        if(decodedToken){
            return decodedToken.id;
        }
    }

    return null;
}