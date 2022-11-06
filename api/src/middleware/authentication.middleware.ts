import { NextFunction, Request, Response } from "express";
import { API_USERNAME } from "../config/api.config";

export default (req: Request, res: Response, next: NextFunction) => {
  if(req.url === '/login') return next();
  if (!req.session.user || req.session.user !== API_USERNAME) {
    return res.status(401).json({
      error: "Authentication required."
    });
  }
  return next();
};
