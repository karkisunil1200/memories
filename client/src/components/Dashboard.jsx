import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import NewToDo from "./NewToDo";
import ToDoCard from "./ToDoCard";

const Dashboard = () => {
  const { user, completeToDos, incompleteToDos } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
      <NewToDo />
      <div className="todos">
        {incompleteToDos.map((toDo) => (
          <ToDoCard toDo={toDo} key={toDo._id} />
        ))}
      </div>
      <h2 className="todos__title">Complete ToDo's</h2>
      {completeToDos.map((toDo) => (
        <ToDoCard toDo={toDo} key={toDo._id} />
      ))}
    </div>
  );
};

export default Dashboard;
