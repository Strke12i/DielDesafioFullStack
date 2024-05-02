import { useEffect, useState } from "react";
import { useTaskModal } from "../../context/TaskModalContext";
import "./_Modals.scss";
import { clientTask, clientUser } from "../../client/client";
import { getId } from "../../utils/GetData";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';


enum TaskStatus {
    pending = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    ABORTED = "aborted"
}

export const TaskModal = () => {
    const {toggleModal, date, setTaskIdUpdate, toggleUpdateTaskModal} = useTaskModal();
    const [refreshPage, setRefreshPage] = useState<boolean>(false);
    const [tasks, setTasks] = useState([]);
    const { userId } = useUser();

    const firstChars = (str: string) => {
        return str.length > 50 ? str.substring(0, 50) + "..." : str;
    }

    const handleDeleteTask = async (taskId: string) => {
        if(taskId){
            const confirm = window.confirm("Are you sure in delete this task?");
            if(confirm){
                try{
                    const result = await clientTask.delete("/"+taskId);
                    if(result.status === 200){
                        toast.success("Task Deleted!");
                        setRefreshPage(!refreshPage);
                    } else{
                        throw new Error("Error");
                    }
                }catch(err){
                    toast.error("Error on delete Task");
                }
            }
        }
    }

    const handleUpdateTask = (taskId: string) => {
        setTaskIdUpdate(taskId);
        toggleModal();
        toggleUpdateTaskModal();

    }

    useEffect(() => {
        if(date && userId){
            try{
                const fetchTasks = async () => {
                    const response = await clientUser.get(`/tasks/${userId}/${date}`);
                    const data = response.data;
                    setTasks(data);
                    
                }
                fetchTasks();

            }catch(error: any){
                console.log(error);
                
            }
        }
    }, [date, userId, refreshPage ]);

    return (
        <div className="modal">
            <div className="modal-content">
                 <div className="title">
                    <h2>Tasks from {date}</h2>
                        <CloseIcon onClick={toggleModal} className="close"/>
                
                </div>
                <div className="view-tasks">
                {tasks.map((task: any) => (
                    <div key={task.id} className="task-card">
                        <div className="task-header">
                        <h3 className="task-title">{task.title}</h3>
                        <div className="buttons">
                            <span onClick={() => {
                                handleDeleteTask(task.id)
                            }}><DeleteIcon className="delete"/></span>
                            <span onClick={() => handleUpdateTask(task.id)}><EditIcon className="edit"/></span>
                            
                        </div>
                        </div>
                        
                        <p className="task-description">{firstChars(task.description)}</p>
                        <div>
                            <p>Start Date: {new Date(task.StartDate).toLocaleString()}</p>
                            <p>End Date: {new Date(task.EndDate).toLocaleString()}</p>
                        <div>
                            <p>Status:
                                <span className={task.status === TaskStatus.COMPLETED ? "completed" : task.status === TaskStatus.pending ? "pending" : task.status === TaskStatus.IN_PROGRESS ? "in_progress" : "aborted"}>
                                    {task.status} </span>
                            </p>
                        </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export const CreateTaskModal = () => {
    const {toggleCreateTaskModal} = useTaskModal();
    const [userId, setUserId] = useState<string | null>(null)

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")

    const handleCreateTask = async () => {
        try{
            if(!userId){
                throw new Error("User not found")
            }

            if(!title || !description || !startDate || !endDate){
                throw new Error("Please fill all fields")
            }

            if(new Date(startDate) > new Date(endDate)){
                throw new Error("End Date must be greater than Start Date")
            }

            const result = await clientTask.post("/",{
                title,
                description,
                userId,
                status: "pending",
                StartDate: new Date(startDate),
                EndDate: new Date(endDate)
            });

            if(result.status !== 201){
                throw new Error("Error while creating task")
            }

            setTitle("");
            setDescription("");
            setStartDate("");
            setEndDate("");
            

            toast.success("Task created successfully");
        }catch(error: any){
            
            toast.error("Error on create Task");
        }
    }

    useEffect(() => {
        setUserId(getId());
    }, []);


    return (
        <div className="modal">
            <div className="modal-content">
                <div className="title">
                    <h2>Create Task</h2>

                        <CloseIcon onClick={toggleCreateTaskModal} className="close"/>
                
                </div>
                
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value) }/>
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <div className="dates">
                    <label>Start Date
                    <input type="datetime-local" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)}  />
                    </label>
                    <label>End Date
                    <input type="datetime-local" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                </div>
                
                <button className="button" onClick={handleCreateTask}>Create</button>

            </div>
            
        </div>
    )
}

export const UpdateTaskModal = () => {
    const {userId} = useUser();
    const {taskIdUpdate, toggleUpdateTaskModal} = useTaskModal();

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")
    const [status, setStatus] = useState<string>("");
    const [taskUserId, setTaskUserId] = useState<string>("");

    const handleSubmit = async () => {
        try{
            if(title && description && startDate && endDate && status && taskUserId) {
                if (!(userId === taskUserId)){
                    throw new Error("User are not the owner of the task")
                }

                const result = await clientTask.put("/"+taskIdUpdate, {
                    title,
                    description,
                    StartDate: new Date(startDate),
                    EndDate: new Date(endDate),
                    status,
                    userId,
                });
                if(result.status === 200){
                    toast.success("Task Updated")
                }else{
                    throw new Error("Error on update task")
                }
            }else{
                throw new Error("Missing Iputs")
            }
            
        }catch(e){
            toast.error("Error on Update Task")
        }
        
    }

    const formatDate = (d: string) =>{
        const date= new Date(d);
        const year: number = date.getFullYear(); 
        const month: number = date.getMonth() + 1; 
        const day: number = date.getDate();
        const hours: number = date.getHours();
        const minutes: number = date.getMinutes();

 
        const formatedDate: string = `${year.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formatedDate;
    }


    useEffect(() => {
        if(userId && taskIdUpdate){
            try{
                const fetchTask = async () =>{
                    const result = await clientTask.get("/"+taskIdUpdate);
                    const data = result.data;
                    console.log(data);
                    

                    setTitle(data.title);
                    setDescription(data.description);
                    setStartDate(formatDate(data.StartDate));
                    setEndDate(formatDate(data.EndDate));
                    setStatus(data.status);
                    setTaskUserId(data.userId);

                }


                fetchTask();
                
            }catch(e){
                toast.error(e as string);
            }
        }
    },[])


    return (
        <div className="modal">
            <div className="modal-content">
                <div className="title">
                    <h2>Update Task</h2>

                        <CloseIcon className="close" onClick={toggleUpdateTaskModal}/>
                
                </div>
                
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value) }/>
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <div className="dates">
                    <label>Start Date
                    <input type="datetime-local" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)}  />
                    </label>
                    <label>End Date
                    <input type="datetime-local" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                    
                </div>
                <label>
                        <select name="status" onChange={(e) => setStatus(e.target.value)}>
                            <option value={"pending"} className="pending">Pending</option>
                            <option value={"in_progress"} className="in_progress">In progress</option>
                            <option value={"completed"} className="completed">Completed</option>
                            <option value={"aborted"} className="aborted">Aborted</option>
                        </select>
                        
                    </label>
                
                <button onClick={handleSubmit} className="button">Update Task</button>

            </div>
            
        </div>
    )
}