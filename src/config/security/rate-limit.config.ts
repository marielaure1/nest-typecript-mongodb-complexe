import rateLimit from "express-rate-limit";

export const basicRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	handler: (req, res) => {
		return res.status(429).json({
			status: 429,
			succes: false,
			message: "Too many requests. Please try again later.",
		});
	},
	// TODO: cache with Redis
	// store: new RedisStore({
	//     sendCommand: (...args: string[]) => redisClient.sendCommand(args),
	// }),
});
