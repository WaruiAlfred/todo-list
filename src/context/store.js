import { createContext, useReducer } from "react";

const initialValues = {
  edit: false,
  todoUpdateId: "",
  todo: "",
  onUpdateTodo: (todo) => {},
  onUndoEditTodo: () => {},
  onAddTodoOnChange: (todo) => {},
  onClearTodo: () => {},
};

const todoContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TODO":
      return {
        edit: true,
        todoUpdateId: action.todoItem.id,
        todo: action.todoItem.todo,
      };
    case "UNDO_EDIT_TODO":
      return { ...state, edit: false };
    case "ADD_TODO_ONCHANGE":
      return { ...state, todo: action.todo };
    case "CLEAR_TODO":
      return { ...state, todo: "" };
    default:
      throw new Error("Something went wrong");
  }
};

const AppContext = createContext(initialValues);

export const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(todoContextReducer, initialValues);

  const handleUpdateTodo = (todo) => {
    dispatch({ type: "UPDATE_TODO", todoItem: todo });
  };

  const handleUndoEditTodo = () => {
    dispatch({ type: "UNDO_EDIT_TODO" });
  };

  const handleAddTodoOnChange = (todo) => {
    dispatch({ type: "ADD_TODO_ONCHANGE", todo });
  };

  const handleClearTodo = () => {
    dispatch({ type: "CLEAR_TODO" });
  };

  const appValues = {
    edit: appState.edit,
    todoUpdateId: appState.todoUpdateId,
    todo: appState.todo,
    onUpdateTodo: handleUpdateTodo,
    onUndoEditTodo: handleUndoEditTodo,
    onAddTodoOnChange: handleAddTodoOnChange,
    onClearTodo: handleClearTodo,
  };

  return (
    <AppContext.Provider value={appValues}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
