import {createBrowserRouter} from "react-router-dom"
import { homepageRoutes } from "./home.router";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			...homepageRoutes
		],
	 },
]);

export default router