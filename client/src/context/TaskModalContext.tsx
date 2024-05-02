import { createContext, useContext, useState } from "react";

interface TaskModalContextProps {
    openModal: boolean;
    toggleModal: () => void;
    date: string;
    setDate: (date: string) => void;
    openCreateTaskModal: boolean;
    toggleCreateTaskModal: () => void;
    openUpdateTaskModal: boolean;
    toggleUpdateTaskModal: () => void;
    taskIdUpdate: string;
    setTaskIdUpdate: (id: string) => void;
}

const TaskModalContext = createContext<TaskModalContextProps>({
    openModal: false,
    openCreateTaskModal: false,
    toggleModal: () => {},
    date: "",
    setDate: () => {},
    toggleCreateTaskModal: () => {},
    openUpdateTaskModal: false,
    toggleUpdateTaskModal: () => {},
    taskIdUpdate: "",
    setTaskIdUpdate: () => {}

});

export const useTaskModal = () => {
    return useContext(TaskModalContext);
}
export const TaskModalProvider = ({children}: any) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openCreateTaskModal, setOpenCreateTaskModal] = useState<boolean>(false);
    const [openUpdateTaskModal, setOpenUpdateTaskModal] = useState<boolean>(false);
    const [taskIdUpdate, setTaskIdUpdate] = useState<string>("");
    const [date, setDate] = useState<string>("");
    
    const toggleModal = () =>{
        setOpenModal(!openModal);
    }

    const toggleCreateTaskModal = () => {
        setOpenCreateTaskModal(!openCreateTaskModal);
    }

    const toggleUpdateTaskModal = () => {
        setOpenUpdateTaskModal(!openUpdateTaskModal);
    }
    
    const value = {
        openModal,
        openCreateTaskModal,
        toggleCreateTaskModal,
        toggleModal,
        date,
        setDate,
        openUpdateTaskModal,
        toggleUpdateTaskModal,
        setTaskIdUpdate,
        taskIdUpdate
    }

    return (
        <TaskModalContext.Provider value={value}>
            {children}
        </TaskModalContext.Provider>
    )
}
