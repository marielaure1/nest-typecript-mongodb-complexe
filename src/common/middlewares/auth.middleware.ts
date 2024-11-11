import {
	HttpStatus,
	Injectable,
	NestMiddleware,
} from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { Token } from "@helpers/token.helper";
import { TokenTypeEnum } from "@enums/token-type.enum";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	async use(req: FastifyRequest, res: FastifyReply, next: () => void) {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).send({
				message: "Missing or invalid authentication token",
			});
		}

		const token = authHeader.split(" ")[1];

		if (!token) {
			return res.status(401).send({
				message: "No token provided",
			});
		}

		try {
			Token.verifyToken(token, TokenTypeEnum.ACCESS);
			next(); // Passe à la requête suivante seulement si tout est OK
		} catch (err) {
			// Gestion des erreurs et renvoi de la réponse sans appel à next()
			if (err.message.includes("TokenExpiredError")) {
				return res.status(401).send({
					message: "Token expired",
				});
			} else if (err.message.includes("JsonWebTokenError")) {
				return res.status(401).send({
					message: "Invalid token",
				});
			} else {
				return res.status(500).send({
					message: "Token validation error",
				});
			}
		}
	}
}
