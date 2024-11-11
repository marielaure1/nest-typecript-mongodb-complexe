import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientsView } from "@modules/clients/views/clients.view";

@Injectable()
export class DatabaseViewsManagerService implements OnModuleInit {
	constructor(private readonly clientsView: ClientsView) {}

	async onModuleInit() {
		try {
			await this.clientsView.createClientUserView();
			console.log("Clients-Users View created successfully");
		} catch (error) {
			console.error("Error creating Clients-Users View:", error);
		}
	}
}
