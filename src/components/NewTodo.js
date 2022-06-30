import { Box, Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { ref, set, update } from "firebase/database";
import { uid } from "uid";
import { useContext } from "react";
import AppContext from "../context/store";

const NewTodo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    edit,
    todo,
    todoUpdateId,
    onAddTodoOnChange,
    onClearTodo,
    onUndoEditTodo,
  } = useContext(AppContext);

  const handleAddTodoToDb = (data) => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      id: uuid,
      complete: false,
      todo: data?.todo,
    });

    onClearTodo();
  };

  const handleUpdateTodo = (data) => {
    update(ref(db, `/${todoUpdateId}`), {
      id: todoUpdateId,
      complete: false,
      todo: data?.todo,
    });

    onClearTodo();
    onUndoEditTodo();
  };

  return (
    <Box width={"100%"}>
      <Container maxWidth="md">
        <form
          onSubmit={handleSubmit(edit ? handleUpdateTodo : handleAddTodoToDb)}
        >
          <Box display={"flex"}>
            <TextField
              id="todo"
              label="Todo"
              name="todo"
              {...register("todo", { required: "Required" })}
              value={todo}
              onChange={(e) => onAddTodoOnChange(e.target.value)}
              error={!!errors?.todo}
              helperText={errors?.todo ? errors.todo.message : null}
              sx={{ width: "30rem" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginLeft: "10px", height: "54px" }}
            >
              {edit ? "Edit" : "Add"} Todo
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default NewTodo;
