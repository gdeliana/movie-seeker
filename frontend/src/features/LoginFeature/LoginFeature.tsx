import Grid from "@mui/material/Grid";
import TextField from "../../components/CustomTextField";
import { useState } from "react";
import { loginThunk } from "./store/authentication.slice";
import { actions as LoginActions } from "./store/authentication.slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Typography from "@mui/material/Typography";
import css from "./LoginFeature.module.css";
import Box from "@mui/material/Box";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

const GridItem: React.FC<{
  children: JSX.Element;
}> = ({ children }) => (
  <Grid item xs={12} sm={10} md={6} xl={4}>
    {children}
  </Grid>
);
export const LoginFeature = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const { login_error, loading } = useAppSelector(({ authentication }) => {
    return {
      login_error: authentication.error,
      loading: authentication.loading,
    };
  });

  const onLoginHandler = () => {
    if (username.trim() !== "" && password.trim() !== "") {
      dispatch(
        loginThunk({
          username,
          password,
        })
      );
    } else {
      dispatch(
        LoginActions.setError("Please provide a username and a password")
      );
    }
  };
  return (
    <Box className={css.box}>
      <form>
        <Grid
          direction="column"
          justifyContent="center"
          alignItems="center"
          container
          spacing={2}
        >
          <GridItem>
            <>
              <Typography className={css.header} variant="body1" component="p">
                Please login
              </Typography>
              <TextField
                id="username"
                value={username}
                setparentvalue={setUsername}
                label="Username"
                variant="filled"
                autoComplete="on"
              />
            </>
          </GridItem>
          <GridItem>
            <TextField
              type="password"
              id="password"
              value={password}
              setparentvalue={setPassword}
              label="Password"
              variant="filled"
              autoComplete="on"
            />
          </GridItem>
          <GridItem>
            <LoadingButton
              // react complains when passing boolean
              loading={Number(loading)}
              variant="contained"
              color="info"
              onClick={onLoginHandler}
              data-testid="loginButton"
            >
              Login
            </LoadingButton>
          </GridItem>
          {login_error !== "" && (
            <GridItem>
              <Typography
                className={css.error}
                variant="body1"
                component="span"
              >
                {login_error}
              </Typography>
            </GridItem>
          )}
        </Grid>
      </form>
    </Box>
  );
};
