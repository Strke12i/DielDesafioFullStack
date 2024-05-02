
import { useAuth } from "../../context/AuthContext";
import { Calendar } from "../Calendar/Calendar";
import { TaskModalProvider } from "../../context/TaskModalContext";
import { Toaster } from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { clientUser } from "../../client/client";
import LogoutIcon from "@mui/icons-material/Logout";
import "./_Dashboard.scss"



export const Dashboard = () => {
    const { onLogout } = useAuth();
    const { userId } = useUser()
    const [userName, setUserName] = useState<string>("");

    useEffect(()=> {
        if(userId){
            try{
                const fetchUser = async () => {
                    const result = await clientUser.get("/"+userId);
                    setUserName(result.data.name);
                }
                fetchUser();
            }catch(e){
    
            }
        }
    }, [userId])


    return (
        <div className="root-div">
            <TaskModalProvider>
                <div className="content_bar">
                    <h1>Dashboard</h1>
                    <span>
                    <LogoutIcon onClick={onLogout} className="logout_button" ></LogoutIcon>
                    </span>
                </div>
                <h2 className={"h"}>Welcome, {userName}</h2>
                <Calendar />
                <Toaster />
            </TaskModalProvider>
            
        </div>
    )
}