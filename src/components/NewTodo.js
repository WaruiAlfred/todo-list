import { Box, Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { ref, set, update } from "firebase/database";
import { uid } from "uid";

const NewTodo = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddTodoToDb = (data) => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      todo: data?.todo,
      id: uuid,
    });

    props.handleSetTodo("");
  };

  const handleUpdateTodo = (data) => {
    update(ref(db, `/${props.todoUpdateId}`), {
      todo: data?.todo,
      id: props.todoUpdateId,
    });

    props.handleSetTodo("");
    props.handleEdit(false);
  };

  return (
    <Box width={"100%"}>
      <Container maxWidth="md">
        <form
          onSubmit={handleSubmit(
            props.edit ? handleUpdateTodo : handleAddTodoToDb
          )}
        >
          <Box display={"flex"}>
            <TextField
              id="todo"
              label="Todo"
              name="todo"
              {...register("todo", { required: "Required" })}
              value={props.todo}
              onChange={(e) => props.handleSetTodo(e.target.value)}
              error={!!errors?.todo}
              helperText={errors?.todo ? errors.todo.message : null}
              sx={{ width: "30rem" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginLeft: "10px", height: "54px" }}
            >
              {props.edit ? "Edit" : "Add"} Todo
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default NewTodo;
