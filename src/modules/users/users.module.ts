import { Global, Module } from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { UserHelper } from "@modules/users/helpers/user.helper";

@Global()
@Module({
	imports: [],
	controllers: [],
	providers: [UsersService, UserHelper],
	exports: [UsersModule, UsersService, UserHelper],
})
export class UsersModule {}
