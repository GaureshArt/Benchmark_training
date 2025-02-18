import { MouseEvent, useEffect, useState } from "react";
import { IEditTodoData, ITodoList, ITodoListProps } from "../types/types";

export const TodoList = ({ todoList, setTodoList }: ITodoListProps) => {
  const [editTodoData, setEditTodoData] = useState<IEditTodoData>({
    isEditing: false,
    editTodoId: -1,
    editText: "",
  });
  useEffect(()=>{
    const previousTodoList:ITodoList[] = JSON.parse(sessionStorage.getItem('todoList') as string);
    
    if(previousTodoList) setTodoList([...previousTodoList]);
  },[])

  const handleEditTodo = (e: MouseEvent<HTMLButtonElement>): void => {
    if (editTodoData.isEditing) {
      alert("Please first save current editing todo");
      return;
    }
    const TodoLi = (e.target as HTMLButtonElement).closest(
      ".todoLi"
    ) as HTMLLIElement;
    const TodoText = (TodoLi.querySelector(".todoText") as HTMLSpanElement)
      .innerHTML;
    
    setEditTodoData({
      isEditing: true,
      editTodoId: +TodoLi.id,
      editText: TodoText,
    });
  };
  const handleEditingTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoData({
      ...editTodoData,
      editText: e.target.value,
    });
  };
  const handleSaveTodo = () => {
    const newTodoList: ITodoList[] = todoList.map((todos): ITodoList => {
      return todos.id === editTodoData.editTodoId
        ? { id: editTodoData.editTodoId, todo: editTodoData.editText }
        : todos;
    });
    setTodoList([...newTodoList]);
    setEditTodoData({
      isEditing: false,
      editTodoId: -1,
      editText: "",
    });
  };
  const handleRemoveTodo = (e: MouseEvent<HTMLButtonElement>): void => {
    if (!confirm("Are you sure?")) return;
    const TodoLi = (e.target as HTMLButtonElement).closest(
      ".todoLi"
    ) as HTMLLIElement;
    const newTodoList: ITodoList[] = todoList.filter(
      (todo) => todo.id !== +TodoLi.id
    );
    setTodoList([...newTodoList]);
  };

  const handleClearTodos = ()=>{
    if(!confirm("Are you sure it will delete all todos?"))return;
    setTodoList([])
  }
  return (
    <>
      <div className="w-[100vw] h-[80vh] bg-slate-600 flex justify-start gap-5 flex-col items-center pt-10 font-mono">
        <ul className="w-1/3 gap-2 grid">
          {todoList.map((todo) => {
            return (
              <li
                className="todoLi w-full border border-zinc-300 p-3 rounded text-zinc-100 flex gap-3"
                id={`${todo.id}`}
                key={todo.id}
              >
                {todo.id === editTodoData.editTodoId ? (
                  <>
                    <input
                      className="border border-zinc-200 rounded-lg w-4/5 p-2 text-stone-300 "
                      type="text"
                      value={editTodoData.editText}
                      onChange={handleEditingTodoText}
                    />
                    <button
                      className="border border-yellow-900 bg-yellow-400 text-black w-20 rounded  cursor-pointer"
                      onClick={handleSaveTodo}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span className="todoText w-full">{todo.todo}</span>
                    <button
                      className="border borxder-yellow-900 bg-yellow-400 text-black w-20 rounded  cursor-pointer"
                      onClick={handleEditTodo}
                    >
                      Edit
                    </button>
                    <button
                      className="border border-red-900 bg-red-400 text-black w-22 rounded cursor-pointer "
                      onClick={handleRemoveTodo}
                    >
                      Remove
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
        {todoList.length>0? <button  className="border border-red-800 bg-red-500 text-black w-22 rounded cursor-pointer " onClick={handleClearTodos}>Clear</button>:''}
      </div>
    </>
  );
};
