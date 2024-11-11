import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

@Injectable()
export class ClientsView {
	constructor(@InjectConnection() private readonly connection: Connection) {}

	async createClientUserView() {
		const db = this.connection.db;

		const collections = await db
			.listCollections({ name: "clients-users" })
			.toArray();

		if (collections.length > 0) {
			await db.collection("clients-users").drop();
		}

		await db.command({
			create: "clients-users",
			viewOn: "clients",
			pipeline: [
				{
					$lookup: {
						from: "users",
						let: { userIdStr: { $toObjectId: "$userId" } },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ["$_id", "$$userIdStr"] },
								},
							},
						],
						as: "user",
					},
				},
				{ $unwind: "$user" },
				{
					$project: {
						"user.password": 0,
					},
				},
			],
		});

		console.log('View "clients-users" created successfully');
	}
}
