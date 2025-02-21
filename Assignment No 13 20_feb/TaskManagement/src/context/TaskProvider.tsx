import {  createContext, useReducer } from "react"
import { Action, PropsProvider,  TaskProviderValuesType,  TaskType } from "../types/TaskTypes";

export const TaskContext = createContext<TaskProviderValuesType | null>(null);

const taskReducer = (state:TaskType[],action:Action):(TaskType[])=>{
    switch (action.type) {
        case 'ADD_TASk':{
            return [...state,{task:action.info.task,id:Date.now(),taskStatus:action.info.taskStatus}];
        }
        case 'REMOVE_TASK':{
            const newState = state.filter((task)=>task.id !== action.info.id);
            return newState;
        }
        case 'TOGGLE_TASK':{
            const newState = state.map((task)=>{
                return task.id===action.info.id?{...task,taskStatus:(task.taskStatus==='Complete'?'Incomplete':'Complete')}:task;
            })
            return newState;
        }
        default:
            return state;
    }
}

export const TaskProvider =({children}:PropsProvider)=>{

    const initialState:TaskType[] = [];
    const [state,dispatch] = useReducer(taskReducer,initialState);
    return (
        <TaskContext.Provider value={{state,dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}