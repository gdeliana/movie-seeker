import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store";
import router from "./routes";

const Main = () => (
    <React.StrictMode>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
        </StyledEngineProvider>
      </Provider>
    </React.StrictMode>
  )

export default Main;