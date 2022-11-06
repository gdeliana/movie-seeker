import { createClient } from 'redis';
import {REDIS_PORT, REDIS_URL, REDIS_PASS, REDIS_USER} from "../config/redis.config"

let connected = false;

const client = createClient({
	url: `redis://${REDIS_USER}:${REDIS_PASS}@${REDIS_URL}:${REDIS_PORT}`,
	socket: {
		reconnectStrategy: (retries) => {
			if(retries == 1){
				return new Error("cannot connect to redis, maximum retries count exceded.");
			}
			return retries;
		}
	}
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => {
	console.log("API connected to redis");
	connected = true;
});

if(REDIS_URL)
	client.connect();

export const setKey = async (key: string, value:string) => {
	if(!connected) return false;
	console.log("set cached", key);
	await client.set(key, value);
	client.expire(key, 3600 * 24 * 5);
}

export const getKey = async (key: string) => {
	if(!connected) return false;
	console.log("get cached", key);
	return await client.get(key);
}

export default client