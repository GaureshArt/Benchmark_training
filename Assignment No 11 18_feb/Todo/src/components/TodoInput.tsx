import { useState } from "react";
import { ITodoHandleProps, ITodoList } from "../types/types";

export const TodoInput = ({handleTodoList}:ITodoHandleProps) => {
    const [todoText,setTodoText] = useState<ITodoList>({
        id:0,
        todo:''
    })
    const handleTodoText = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setTodoText({
            id:Date.now(),
            todo:e.target.value
        })
        
    }
    const handleTodoSubmit = ()=>{
        
        handleTodoList(todoText);
        setTodoText({
            id:0,
            todo:''
        })

    }
  return (
    <>
      <div className="w-[100vw] h-[20vh] bg-slate-600 flex justify-center items-center flex-col gap-10 font-mono">
        <h1 className="text-xl text-zinc-100 ">Todo </h1>
        <div className="w-1/3 h-10 flex gap-2">
        <input className="border border-zinc-200 rounded-lg w-4/5 p-2 text-stone-300 " type="text" id="todoText" value={todoText.todo} onChange={handleTodoText} />
        <button className="border border-zinc-200 w-20 h-10 rounded-lg text-stone-300 cursor-pointer" onClick={handleTodoSubmit}>Add</button>
        </div>
      </div>
    </>
  );
};
