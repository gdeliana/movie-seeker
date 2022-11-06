import dotenv from 'dotenv';
dotenv.config();
export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_PASS = process.env.REDIS_PASS;
export const REDIS_USER = process.env.REDIS_USER;