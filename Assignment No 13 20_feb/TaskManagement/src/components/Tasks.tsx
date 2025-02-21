import { Toaster } from "react-hot-toast";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";
import { useTaskContext } from "../hooks/useTaskContext";
import { TaskType } from "../types/TaskTypes";
import { useCallback, useMemo, useState } from "react";

export const Tasks = () => {
  const [count, setCount] = useState(0);

  const { state, dispatch } = useTaskContext();

  const handleAddTask = useCallback(
    (taskData: TaskType) => {
      dispatch({ type: "ADD_TASk", info: taskData });
    },
    [dispatch]
  );

  const handleRemoveTask = useCallback(
    (task: TaskType) => {
      dispatch({ type: "REMOVE_TASK", info: { ...task } });
    },
    [dispatch]
  );
  const handleStatus = useCallback(
    (task: TaskType) => {
      dispatch({ type: "TOGGLE_TASK", info: { ...task } });
    },
    [dispatch]
  );
  const getTotalCompletedTask = () => {
    return state.filter((task) => task.taskStatus === "Complete").length;
  };
  const totalCompletedTask = useMemo(() => getTotalCompletedTask(), [state]);

  return (
    <>
      <Toaster />
      <div className="w-[100vw] min-h-[100vh] h-auto bg-slate-800 flex justify-start flex-col items-center gap-5">
        <h1 className="text-slate-100">unnecessary work - {count}</h1>
        <button
          className="w-25 h-10 border text-slate-100 border-slate-200 rounded"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <TaskInput handleAddTask={handleAddTask} />
        <TaskList
          handleRemoveTask={handleRemoveTask}
          handleStatus={handleStatus}
          totalCompletedTask={totalCompletedTask}
          state={state}
        />
      </div>
    </>
  );
};
