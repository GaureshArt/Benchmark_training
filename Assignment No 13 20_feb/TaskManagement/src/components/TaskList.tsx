

import { memo} from "react";
import {  TaskListPropsType } from "../types/TaskTypes";


export const TaskList = memo(({handleRemoveTask,handleStatus,totalCompletedTask,state}:TaskListPropsType)=>{
    
    console.log("Tasklist comp")
   
       return (
           <>{state.length?
   
               <div className="w-1/2 h-auto border border-slate-200 rounded-md">
                   <ul className="flex justify-start items-center flex-col gap-4 p-2 text-slate-100">
                       <li>Total Completed Task - {totalCompletedTask}</li>
                       {
                           state.map((task)=>{
                               return (
                                   <li key={task.id} className="border border-slate-200 rounded-md w-4/5 h-15 flex gap-5 pr-4  pl-5 items-center">
                                       <span className="w-full text-lg">Task: {task.task}</span>
                                       <span className={`w-1/5 h-8 rounded-lg border p-2 text-center flex justify-center items-center ${task.taskStatus==='Incomplete'?'bg-red-400':'bg-green-400'} text-slate-100 cursor-pointer`}  onClick={()=>handleStatus(task)}>{task.taskStatus}</span>
                                       <button className="w-20 h-10 border rounded  bg-red-500 border-red-300 p-2 cursor-pointer" onClick={()=>handleRemoveTask(task)}>Remove</button>
                                   </li>
                               )
                           })
                       }
                   </ul>
               </div>:''
           }
           </>
       )
   })