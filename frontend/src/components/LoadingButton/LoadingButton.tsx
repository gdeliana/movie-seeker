import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import css from "./LoadingButton.module.css";
const LoadingButton: React.FC<ButtonProps & {
	loading: number
}> = (props) => (
  <Button {...props}>
    Login
    {props.loading === 1 && <CircularProgress className={css.loader} />}
  </Button>
);

export default LoadingButton;
