import { useEffect, useState } from "react"
import { TodoInput } from "./components/TodoInput"
import { ITodoList } from "./types/types"
import { TodoList } from "./components/TodoList"

function App() {
  const [todoList,setTodoList] = useState<ITodoList[]>([])
  useEffect(() => {
    if (todoList.length > 0) {
      sessionStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);
  const handleTodoList = (todoData:ITodoList)=>{
    setTodoList([
      ...todoList,
      todoData
    ]);
  }

  return (
    <>
      <TodoInput  handleTodoList = {handleTodoList} />
      <TodoList todoList = {todoList}  setTodoList = {setTodoList}/>
    </>
  )
}

export default App
