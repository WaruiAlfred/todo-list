import { CssBaseline, ThemeProvider } from "@mui/material";
import Todos from "./components/Todos";
import { theme } from "./theme/theme";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Todos />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
