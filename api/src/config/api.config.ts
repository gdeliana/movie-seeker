import dotenv from 'dotenv';
dotenv.config();
export const OMDB_API = "http://www.omdbapi.com"
export const OMDB_KEY = "3e7584ba"
export const API_USERNAME = process.env.API_USERNAME;
export const API_PASS = process.env.API_PASS;
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const CLIENT_URL = process.env.CLIENT_URL;
export const PORT = process.env.PORT || 8001;
export const BASE_URL = `http://localhost:${PORT}`;