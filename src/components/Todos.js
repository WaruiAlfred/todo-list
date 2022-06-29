import { useState } from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import NewTodo from "./NewTodo";
import TodosItems from "./TodosItems";
import { remove, ref } from "firebase/database";
import { db } from "../firebase";
import RefreshIcon from "@mui/icons-material/Refresh";

const Todos = () => {
  const [edit, setEdit] = useState(false);
  const [todoUpdateId, setTodoUpdateId] = useState("");
  const [todo, setTodo] = useState("");

  const handleRefresh = () => {
    remove(ref(db, "/"));
  };

  return (
    <Box width={"100%"} height={"100%"} flexGrow={1} marginTop="20px">
      <Container maxWidth="lg">
        <Typography variant="h2">TODOS</Typography>
        <IconButton
          aria-label="refresh"
          color="primary"
          onClick={handleRefresh}
        >
          <RefreshIcon />
        </IconButton>
        <NewTodo
          todo={todo}
          edit={edit}
          todoUpdateId={todoUpdateId}
          handleEdit={setEdit}
          handleSetTodo={setTodo}
        />
        <TodosItems
          handleSetTodoUpdateId={setTodoUpdateId}
          handleEdit={setEdit}
          handleSetTodo={setTodo}
        />
      </Container>
    </Box>
  );
};

export default Todos;
