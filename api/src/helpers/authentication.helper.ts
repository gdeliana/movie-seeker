import { Request } from "express";
import { API_USERNAME, API_PASS } from "../config/api.config";
export const extractCredentials = (authorizationHeader:string) : {
	user?:string
	pass?:string
} => {
	const b64auth = authorizationHeader.split(" ")[1] || "";
  const [user, pass] = Buffer.from(b64auth, "base64").toString().split(":");
  return {user, pass};
}
export const authenticateUser = ({user, pass}:{user?:string, pass?:string}): boolean => {
  if (user && pass && user === API_USERNAME && pass === API_PASS) {
    return true;
  }
  return false;
};
