import axios from "axios";
import React, { useRef, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const ToDoCard = ({ toDo }) => {
  const [content, setContent] = useState(toDo.content);
  const [editing, setEditing] = useState(false);
  const input = useRef(null);
  const { toDoComplete, toDoIncomplete } = useGlobalContext();

  const onEdit = (e) => {
    e.preventDefault();

    setEditing(true);
    input.current.focus();
  };

  const stopEditing = (e) => {
    if (e) {
      e.preventDefault();
    }

    setEditing(false);
    setContent(toDo.content);
  };

  const markAsComplete = (e) => {
    e.preventDefault();

    axios
      .put(`api/todos/${toDo._id}/complete`)
      .then((res) => {
        toDoComplete(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const markAsIncomplete = (e) => {
    e.preventDefault();

    axios
      .put(`api/todos/${toDo._id}/incomplete`)
      .then((res) => {
        toDoIncomplete(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`todo ${toDo.complete ? "todo--complete" : ""}`}>
      <input
        type="checkbox"
        checked={toDo.complete}
        onChange={!toDo.complete ? markAsComplete : markAsIncomplete}
      />
      <input
        type="text"
        ref={input}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="todo__controls">
        {!editing ? (
          <>
            {!toDo.complete && <button onClick={onEdit}>Edit</button>}
            <button>Delete</button>
          </>
        ) : (
          <>
            <button onClick={stopEditing}>Cancel</button>
            <button>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;
