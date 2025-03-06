// Base
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

// Dependencies
import { Model } from "mongoose";

// Services
import { AppService } from "@src/app.service";

// Entity
import {
	RefreshToken,
	RefreshTokenDocument,
} from "@modules/auth/entities/refresh-token.entity";

// Dtos
import { CreateRefreshTokenDto } from "@modules/auth/dto/create-refresh-token.dto";
import { UpdateRefreshTokenDto } from "@modules/auth/dto/update-refresh-token.dto";

/**
 * Service for handling refresh tokens.
 */
@Injectable()
export class RefreshTokenService extends AppService<
	RefreshTokenDocument,
	CreateRefreshTokenDto,
	UpdateRefreshTokenDto
> {
	/**
	 * Creates an instance of RefreshTokenService.
	 *
	 * @param {Model<RefreshTokenDocument>} refreshTokenModel - The Mongoose model for refresh tokens.
	 */
	constructor(
		@InjectModel(RefreshToken.name)
		private refreshTokenModel: Model<RefreshTokenDocument>,
	) {
		super(refreshTokenModel);
	}
}
