import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import './_Calendar.scss'
import { CreateTaskModal, TaskModal, UpdateTaskModal } from "../_Modals/Modals"
import { useTaskModal } from "../../context/TaskModalContext"
import { useEffect, useState } from "react"
import { clientUser } from "../../client/client"
import { useUser } from "../../context/UserContext"
import axios from "axios"
import "./_Calendar.scss"

export const Calendar = () => {
    const { openModal, toggleModal, setDate, toggleCreateTaskModal, openCreateTaskModal, openUpdateTaskModal, toggleUpdateTaskModal } = useTaskModal();
    const [holidays, setHolidays] = useState([]);
    const [tasks, setTasks] = useState([]);
    
    const {userId} = useUser();
    useEffect(() => {
    if(userId){
        const fetchHolidays = async () => {
        try {
            const response = await axios.get("https://date.nager.at/Api/v2/PublicHolidays/2024/BR");
            const data = response.data;
            const holidaysList = data.map((holiday: any) => ({
                title: holiday.localName,
                start: holiday.date,
                allDay: true,
                color: 'gray',
                colorText: 'white' 
            }));
            setHolidays(holidaysList);
            
        } catch (error) {
            console.error("Error", error);
        }
        };

        const fetchTasks = async () => {
            try {
                const response = await clientUser.get(`/tasks/${userId}`) ;            
                const data = response.data;

                const tasksList = data.map((task: any) => ({
                    title: task.title,
                    start: task.StartDate,
                    end: task.EndDate,
                    allDay: true,
                    color: task.status === "completed" ? "green" : task.status === "pending" ? "yellow" : task.status === "in_progress" ? "blue" : "red",
                    textColor: task.status === "completed" ? "white" : task.status === "pending" ? "black" : task.status === "in_progress" ? "white" : "white",
                }));
                setTasks(tasksList);
                console.log(tasksList);
            } catch (error) {
                console.error("Error", error);
            }
        }
    
        fetchHolidays();
        fetchTasks();
    }

    
  }, [userId,toggleCreateTaskModal, toggleModal, toggleUpdateTaskModal]);
    
    const handleClickDate = (info: any) => {
        setDate(info.dateStr);
        toggleModal();
    }    

    return (
        <div className="calendar">
            <div className="div-button">
            <button className="button" onClick={toggleCreateTaskModal}>Create Task</button>
            </div>
            
            
        <FullCalendar 
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleClickDate}
            events={
                [
                    ...holidays,
                    ...tasks
                ]
            }
        />
        {openModal && !openCreateTaskModal ? 
            <TaskModal />
        : ""
        }

        {
            openCreateTaskModal && !openModal ?
            <CreateTaskModal />
            : ""
        }

        {
            openUpdateTaskModal && !openCreateTaskModal ? 
            <UpdateTaskModal />
            : ""
        }
        </div>
    )
}