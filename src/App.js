import { CssBaseline, ThemeProvider } from "@mui/material";
import Todos from "./components/Todos";
import { theme } from "./theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Todos />
    </ThemeProvider>
  );
};

export default App;
