import AuthenticationMiddleWare from "./authentication.middleware";
import { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import { COOKIE_SECRET, CLIENT_URL } from "../config/api.config";
import session from "express-session";
import expressWinston from "express-winston";
import winston from "winston";
import fs from "fs";

export default (app: Express) => {
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
  if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
  }
  const d = new Date();
  const todayDate = `${d.getFullYear()}-${d.getMonth()+1<10?`0${d.getMonth()+1}`:d.getMonth()+1}-${d.getDate()<10?`0${d.getDate()}`:d.getDate()}`
  app.use(
    expressWinston.logger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `./logs/${todayDate}.log` }),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
      ignoreRoute: function (req, res) {
        return false;
      }, // optional: allows to skip some log messages based on request and/or response
    })
  );
  app.all("*", AuthenticationMiddleWare);
};
