import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import {
	Client,
	ClientDocument,
} from "@modules/clients/entities/client.entity";
import { CreateClientDto } from "@modules/clients/dto/create-client.dto";
import { UpdateClientDto } from "@modules/clients/dto/update-client.dto";
import { AppService } from "src/app.service";
import { User, UserDocument } from "@modules/users/entities/user.entity";
import { DatabaseHelper } from "@helpers/database.helper";

// TODO: Add more tests
@Injectable()
export class ClientsService extends AppService<
	ClientDocument,
	CreateClientDto,
	UpdateClientDto
> {
	private readonly db: any;
	constructor(
		@InjectModel(Client.name) private clientModel: Model<ClientDocument>,
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private readonly connection: Connection,
	) {
		super(clientModel);
		this.db = this.connection.db;
	}

	async findAllWithUsers(filter: Record<string, any> = {}) {
		try {
			const query = DatabaseHelper.createQueryView(filter);

			const results = await this.db
				.collection("clients-users")
				.find(query)
				.toArray();

			return results;
		} catch (error) {
			console.error("Error handling view:", error);
			throw new Error("Error handling view");
		}
	}
}
