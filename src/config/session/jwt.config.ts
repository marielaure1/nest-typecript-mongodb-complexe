import { Module, Global } from "@nestjs/common";
import { settings } from "@constants/settings";
import { JwtModule as Jwt } from "@nestjs/jwt";
import { configService } from "@constants/env";

// @Global()
@Module({
	imports: [
		Jwt.register({
			global: true,
			secret: configService.get<string>("JWT_SECRET"),
		}),
	],
	exports: [JwtModule],
})
export class JwtModule {}
