import { ChangeEvent, memo, useState } from "react";
import { TaskInputPropsType, TaskType } from "../types/TaskTypes";

import toast from "react-hot-toast";

export const TaskInput = memo(({ handleAddTask }: TaskInputPropsType) => {
  const [taskData, setTaskData] = useState<TaskType>({
    task: "",
    taskStatus: "",
    id: -1,
  });

  const handleTaskData = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = (): boolean => {
    if (!taskData.task || !taskData.task.trim()) {
      toast.error("Please add Task Content!", {
        duration: 1000,
      });
      return false;
    }
    if (!taskData.taskStatus) {
      toast.error("Please select Task Status", {
        duration: 1000,
      });
      return false;
    }
    return true;
  };

  const handleTaskSubmit = () => {
    taskData.id = Date.now();
    if (!handleValidation()) return;
    handleAddTask(taskData);
    setTaskData({
      task: "",
      taskStatus: "",
      id: -1,
    });
  };
  return (
    <>
      <div className="w-2/5 h-30 border border-slate-200 rounded mt-10  grid grid-rows-3 p-2 text-slate-200">
        <div className="row-span-1 w-full  ">
          <label
            className="text-xl text-slate-200 font-mono mr-4"
            htmlFor="task"
          >
            Task
          </label>
          <input
            type="text"
            name="task"
            id="task"
            value={taskData.task}
            onChange={handleTaskData}
            className="w-3/4 border rounded border-slate-200"
          />
        </div>
        <div className="flex justify-start items-center gap-3">
          <label htmlFor="Incomplete">Incomplete</label>
          <input
            type="radio"
            name="taskStatus"
            id="Incomplete"
            onChange={handleTaskData}
            value={"Incomplete"}
            checked={taskData.taskStatus === "Incomplete"}
          />
          <label htmlFor="Complete">Complete</label>
          <input
            type="radio"
            name="taskStatus"
            id="Complete"
            onChange={handleTaskData}
            value={"Complete"}
            checked={taskData.taskStatus === "Complete"}
          />
        </div>
        <button
          type="submit"
          onClick={handleTaskSubmit}
          className="w-1/5 h-8 m-auto bg-green-400 cursor-pointer"
        >
          Submit
        </button>
      </div>
    </>
  );
});
