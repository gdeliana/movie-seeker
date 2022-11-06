import { Express } from "express";
import MainRouter from "./main.routes";
export default (app: Express) => {
  app.use("/", MainRouter);

  app.use(function (req, res, next) {
    res.status(404);
    res.json({ error: "Not found" });
    return;
  });
};
