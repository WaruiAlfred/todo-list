import { Box, Container, Typography, IconButton } from "@mui/material";
import NewTodo from "./NewTodo";
import TodosItems from "./TodosItems";
import { remove, ref } from "firebase/database";
import { db } from "../firebase";
import RefreshIcon from "@mui/icons-material/Refresh";

const Todos = () => {
  const handleRefresh = () => {
    remove(ref(db, "/"));
  };

  return (
    <Box width={"100%"} height={"100%"} flexGrow={1}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "10px auto",
            width: "40rem",
          }}
        >
          <Typography variant="h2">TODOS</Typography>
          <IconButton
            aria-label="refresh"
            color="error"
            onClick={handleRefresh}
          >
            Refresh
            <RefreshIcon />
          </IconButton>
        </Box>
        <NewTodo />
        <TodosItems />
      </Container>
    </Box>
  );
};

export default Todos;
