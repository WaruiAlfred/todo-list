import { Box, Card, IconButton, useTheme } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import DoneIcon from "@mui/icons-material/Done";
import UpdateIcon from "@mui/icons-material/Update";
import { onValue, ref, update } from "firebase/database";
import { db } from "../firebase";
import AppContext from "../context/store";

const TodosItems = () => {
  const [todosData, setTodosData] = useState([]);
  const theme = useTheme();
  const { onUpdateTodo } = useContext(AppContext);

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
    //Update database
    update(ref(db, `/${todo.id}`), {
      id: todo.id,
      complete: true,
      todo: todo.todo,
    });

    //Update View
    setTodosData((previousTodos) =>
      previousTodos.filter((todoData) => todoData.id !== todo.id)
    );
    setTodosData((previousTodos) => [...previousTodos, todo]);
  };

  return (
    <Box
      sx={{
        borderRadius: "10px",
        marginTop: "20px",
        background: theme.palette.secondary.light,
        padding: "10px",
      }}
      maxWidth="md"
    >
      {todosData.map((todo) => (
        <Card
          key={todo.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            margin: "15px 0",
            color: `${todo.complete ? "green" : ""}`,
          }}
        >
          {todo.todo}
          <Box>
            <IconButton
              aria-label="update"
              onClick={() => onUpdateTodo(todo)}
              sx={{ color: `${todo.complete ? "green" : "primary"}` }}
            >
              <UpdateIcon />
            </IconButton>
            <IconButton
              aria-label="done"
              onClick={() => handleCompleteTodo(todo)}
              sx={{ color: `${todo.complete ? "green" : "primary"}` }}
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
