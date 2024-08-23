import * as dotenv from "dotenv";
dotenv.config();

export const settings = {
	...process.env,
};
