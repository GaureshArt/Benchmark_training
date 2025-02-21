import { ReactNode } from "react";


export type TaskType = {
    task:string;
    taskStatus:string;
    id:number;
}

export type TaskProviderValuesType = {
    state:TaskType[];
    dispatch:React.ActionDispatch<[action: Action]>;
}
export type Action = {
    type:'ADD_TASk' | 'REMOVE_TASK' | 'TOGGLE_TASK';
    info:{
        id:number;
        taskStatus:string;
        task:string;
    }
}

export type PropsProvider = {
    children:ReactNode;
}

export type TaskListPropsType = {
    state:TaskType[];
    handleRemoveTask:(task:TaskType)=>void;
    handleStatus:(task:TaskType)=>void;
    totalCompletedTask:number;
}
export type TaskInputPropsType ={
    handleAddTask:(task:TaskType)=>void;
}

export type TaskProps = {
    count:number;
    
}