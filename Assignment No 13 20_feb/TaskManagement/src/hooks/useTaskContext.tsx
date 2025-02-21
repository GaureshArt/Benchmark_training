import { useContext } from "react"
import { TaskContext } from "../context/TaskProvider"
import { TaskProviderValuesType } from "../types/TaskTypes";

export const useTaskContext  = ():TaskProviderValuesType=>{
    const context = useContext(TaskContext);
    if(!context){
        throw new Error ('Please use UseTaskContext in TaskProvider ');
    }
    return context;
}