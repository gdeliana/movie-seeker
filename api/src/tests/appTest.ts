import express, { Express, Request, Response, Router } from "express";
import { CLIENT_URL, COOKIE_SECRET, PORT } from "../config/api.config";
import session from "express-session";
import helmet from "helmet";
import cors from "cors";

const app: Express = express();

if (COOKIE_SECRET === undefined)
  throw new Error("Cookie secret is not defined");
app.use(
  session({
    secret: COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      signed: true,
    },
  })
);
app.use(helmet());
app.use(
  cors({
    origin: [CLIENT_URL || "*", "http://localhost:3001"],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Server OK");
});

export default app;
