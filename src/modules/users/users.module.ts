import { Module } from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { UsersController } from "@modules/users/users.controller";
import { MongooseConfig } from "@config/database/mongoose.config";

@Module({
	imports: [MongooseConfig],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersModule],
})
export class UsersModule {}
