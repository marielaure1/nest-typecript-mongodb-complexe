import { Module, Global } from "@nestjs/common";
import { settings } from "@constants/settings";
import { JwtModule as Jwt } from "@nestjs/jwt";

// @Global()
@Module({
	imports: [
		Jwt.register({
			global: true,
			secret: process.env.JWT_SECRET,
		}),
	],
	exports: [JwtModule],
})
export class JwtModule {}
