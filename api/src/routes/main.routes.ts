import { Router } from "express"
import { LoginController, LogoutController } from "../controllers/login.controller";
import { SearchController } from "../controllers/search.controller";

const MainRouter = Router();

MainRouter.get("/search", SearchController);
MainRouter.get("/login", LoginController);
MainRouter.get("/logout", LogoutController);

export default MainRouter