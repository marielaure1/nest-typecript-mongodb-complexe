import { configService } from "@constants/env";
import { NodeEnvEnum } from "@enums/configs/node-env.enum";

export const settings = {
	isProd: configService.get<string>("API_PORT") === NodeEnvEnum.PROD,
};
