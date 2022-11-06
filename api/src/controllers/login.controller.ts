import { Request, Response } from "express";
import { authenticateUser, extractCredentials } from "../helpers/authentication.helper";
export const LoginController = (
  req: Request,
  res: Response
) => {
  const {user, pass} = extractCredentials(req?.headers?.authorization || "");
  const isValidUser = authenticateUser({user, pass});
  if (isValidUser) {
    req.session.user = user;
    res.json({
      Authenticated: true,
    })
  } else {
    res.clearCookie('connect.sid', {path: '/'}).status(200).json({
      Authenticated: false,
    });
  }
};

export const LogoutController = (
  req: Request,
  res: Response
) => {
  res.clearCookie('connect.sid', {path: '/'}).status(200).json({
    Authenticated: false,
  });
};
