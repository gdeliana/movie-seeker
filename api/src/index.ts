import express, { Express, Request, Response } from 'express';
import SetUpMiddleWares from "./middleware/index.middleware"
import SetUpRoutes from "./routes";
import {PORT} from "./config/api.config";

const app: Express = express();


SetUpMiddleWares(app);
SetUpRoutes(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Server OK');
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

export default app;