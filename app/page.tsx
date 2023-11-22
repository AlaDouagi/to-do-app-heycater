"use client";
import { useState } from "react";

import Container from "@/components/Container";
import TaskItem from "@/components/TaskItem";
import AddTask from "@/components/AddTask";
import { Task } from "@/typings/global.types";
import "./index.css";

function App() {
  const [tasks, setTask] = useState<Task[]>([]);

  const handleComplete = (id: string) => {
    setTask(
      tasks.map((task) => (task.id === id ? { ...task, done: true } : task))
    );
  };

  const handleRemove = (id: string) => {
    setTask(tasks.filter((task) => task.id !== id));
  };

  const handleAdd = (task: Task) => {
    task.id = new Date().getTime();
    setTask([...tasks, task]);
  };

  return (
    <div className="App flex bg-gradient-to-r from-blue-500 to-teal-200 justify-center items-center h-screen w-screen">
      <Container>
        <div className="flex flex-col flex-1 p-5 items-top gap-5">
          {/* add task */}
          <AddTask onAdd={handleAdd} />

          {/* tasks items */}
          {tasks
            .filter((task) => !task.done)
            .map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={handleComplete}
                onRemove={handleRemove}
              />
            ))}

          {/* separator */}
          <div className="w-full border border-blue-300"></div>

          {/* done tasks */}
          {tasks
            .filter((task) => task.done)
            .map((task, index) => (
              <TaskItem key={task.id} task={task} done />
            ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
