import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
// import TasksContext from '../contexts/TasksContext';
import useTaskStore from "../store/useTaskStore";
import SkeletonLoading from "./SkeletonLoading";

const TaskLists = () => {
  // const {tasks} = useContext(TasksContext) no more context hook
  const { tasks, setTasks } = useTaskStore();
  const [loading, setLoading] = useState(false);
  const fetchTask = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();
    setLoading(false);

    setTasks(data);
  };
  useEffect(() => {
    fetchTask();

  }, []);

  return (
    <div>
      <h3 className=" text-xl font-bold font-mono mb-3">
        Tasks list ( Total {tasks.length} , Done{" "}
        {tasks.filter((el) => el.isDone).length})
      </h3>
      {loading &&  <SkeletonLoading />}
      <div>
        {tasks.map((el) => (
          <Task key={el.id} task={el} />
        ))}
      </div>

     
    </div>
  );
};

export default TaskLists;
