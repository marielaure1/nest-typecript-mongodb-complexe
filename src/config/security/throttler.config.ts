import { Global, Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";

@Global()
@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 10,
			},
		]),
	],
	exports: [ThrottlerConfig],
})
export class ThrottlerConfig {}
