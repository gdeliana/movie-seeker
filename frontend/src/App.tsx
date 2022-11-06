import "@fontsource/roboto/400.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { sessionAuthenticatedThunk } from "./features/LoginFeature/store/authentication.slice";
import { useAppDispatch } from "./redux/store";
import { useAppSelector } from "./redux/store";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
function App() {
  const dispatch = useAppDispatch();
  const authentication = useAppSelector(({ authentication }) => authentication);
  useEnhancedEffect(() => {
    dispatch(sessionAuthenticatedThunk());
  }, []);
  return (
    <Box data-testid="App">
      {!authentication.initialAuthenticationCheck ? (
        <LinearProgress />
      ) : (
        <Container data-testid="App" id="App">
          <Outlet />
        </Container>
      )}
    </Box>
  );
}

export default App;
