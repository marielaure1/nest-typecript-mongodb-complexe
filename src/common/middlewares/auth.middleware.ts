import {
	HttpStatus,
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "@modules/users/users.service";
import { Token } from "@helpers/token.helper";
import { UserRoleEnum } from "@enums/user-role.enum";
import { EmployeesService } from "@modules/employees/employees.service";
import { BookerEmployeesService } from "@modules/booker-employees/booker-employees.service";
import { ClientsService } from "@modules/clients/clients.service";
import { Responses } from "@helpers/responses.helper";
// import { CustomersService } from "@modules/customers/customers.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private readonly usersService: UsersService,
		private readonly clientsService: ClientsService,
		private readonly employeesService: EmployeesService,
		private readonly bookerEmployeesService: BookerEmployeesService,
		// private readonly customersService: CustomersService,
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw new UnauthorizedException(
				"Missing or invalid authentication token",
			);
		}

		const token = authHeader.split(" ")[1];
		console.log(token);

		if (!token) {
			return res.status(401).json({ message: "No token provided" });
		}

		try {
			const isValid = Token.verifyToken(token);

			if (!isValid) {
				return res.status(401).json({ message: "Invalid token" });
			}

			const isExpired = Token.isTokenExpired(token);

			if (!isExpired) {
				return res.status(401).json({ message: "Token expired" });
			}

			const payload = Token.getPayload(token);

			if (!payload) {
				return res.status(401).json({ message: "Invalid token" });
			}

			const user = await this.usersService.findOne(payload.sub);

			if (!user) {
				return Responses.getResponse({
					res,
					path: "AuthMiddleware",
					method: "",
					code: HttpStatus.NOT_FOUND,
					subject: "auth",
				});
			}

			req["user"] = user;

			if (user.role.startsWith("ORGANIZATION_")) {
				req["userInfos"] = await this.employeesService.findWhere({
					where: { userId: payload.sub },
				})[0];
			} else if (user.role.startsWith("BOOKER_")) {
				req["userInfos"] = await this.bookerEmployeesService.findWhere({
					where: { userId: payload.sub },
				})[0];
			} else {
				req["userInfos"] = await this.clientsService.findWhere({
					where: { userId: payload.sub },
				})[0];
			}

			next();
		} catch (err) {
			return res.status(401).json({ message: "Invalid token" });
		}
	}
}
