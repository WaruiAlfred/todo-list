import { CssBaseline, ThemeProvider } from "@mui/material";
import Todos from "./components/Todos";
import { AppContextProvider } from "./context/store";
import { theme } from "./theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <CssBaseline />
        <Todos />
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
