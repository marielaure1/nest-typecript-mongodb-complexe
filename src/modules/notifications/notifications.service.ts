import { Injectable } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { NotificationsGateway } from "./notifications.gateway";

@Injectable()
export class NotificationsService {
	constructor(private readonly notificationsGateway: NotificationsGateway) {}

	async createNotification(notification: any) {
		// Logique pour enregistrer la notification dans la base de données, etc.
		this.notificationsGateway.sendNotification(notification);
	}
	create(createNotificationDto: CreateNotificationDto) {
		return "This action adds a new notification";
	}

	findAll() {
		return `This action returns all notifications`;
	}

	findOne(id: number) {
		return `This action returns a #${id} notification`;
	}

	update(id: number, updateNotificationDto: UpdateNotificationDto) {
		return `This action updates a #${id} notification`;
	}

	remove(id: number) {
		return `This action removes a #${id} notification`;
	}
}
