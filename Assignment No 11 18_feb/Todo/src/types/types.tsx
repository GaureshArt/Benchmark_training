
export interface ITodoList{
    id:number;
    todo:string;
    
}

export interface ITodoHandleProps{
    handleTodoList:(data:ITodoList)=>void;
}
export interface ITodoListProps{
    todoList:ITodoList[];
    setTodoList: React.Dispatch<React.SetStateAction<ITodoList[]>>;

}

export interface IEditTodoData{
    isEditing:boolean;
    editTodoId:number;
    editText:string;
}