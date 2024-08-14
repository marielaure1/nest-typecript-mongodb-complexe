import { Module, Global } from "@nestjs/common";
import settings from "@constants/settings";
import { JwtModule as Jwt } from "@nestjs/jwt";

@Global()
@Module({
	imports: [
		Jwt.register({
			global: true,
			secret: settings.JWT_SECRET,
			signOptions: { expiresIn: "60s" },
		}),
	],
	exports: [JwtModule],
})
export class JwtModule {}
