
import { useAuth } from "../../context/AuthContext";

export const Dashboard = () => {
    const { onLogout, authState } = useAuth();

    console.log(authState);
    return (
        <div>
            <h1>Dashboard</h1>
            <p style={{color:"black"}}>{authState?.token}</p>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}