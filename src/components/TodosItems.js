import { Box, Card, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import UpdateIcon from "@mui/icons-material/Update";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";

const TodosItems = (props) => {
  const [todosData, setTodosData] = useState([]);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodosData([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) =>
          setTodosData((previousTodos) => [todo, ...previousTodos])
        );
      }
    });
  }, []);

  const handleCompleteTodo = (todo) => {
    setTodosData((previousTodos) =>
      previousTodos.filter((todoData) => todoData.id !== todo.id)
    );
    setTodosData((previousTodos) => [...previousTodos, todo]);
  };

  const handleUpdateTodo = (todo) => {
    props.handleEdit(true);
    props.handleSetTodoUpdateId(todo.id);
    props.handleSetTodo(todo.todo);
  };

  return (
    <Box>
      {todosData.map((todo) => (
        <Card key={todo.id}>
          {todo.todo}
          <Box>
            <IconButton
              aria-label="update"
              color="primary"
              onClick={() => handleUpdateTodo(todo)}
            >
              <UpdateIcon />
            </IconButton>
            <IconButton
              aria-label="done"
              color="primary"
              onClick={() => handleCompleteTodo(todo)}
            >
              <DoneIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default TodosItems;
