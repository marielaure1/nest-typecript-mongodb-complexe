import { Injectable } from "@nestjs/common";
import { Model, Document, ClientSession, FilterQuery } from "mongoose";

@Injectable()
export abstract class AppService<
	AppModel extends Document,
	CreateDto,
	UpdateDto,
> {
	constructor(
		protected readonly appModel: Model<AppModel>,
		private readonly populate: Array<string> = [],
	) {}

	async create(
		createDto: CreateDto,
		session?: ClientSession,
	): Promise<AppModel> {
		try {
			const createdModel = new this.appModel(createDto);
			await createdModel.save({ session });
			return this.populateModel(createdModel);
		} catch (error) {
			console.error("AppService > create : ", error);
			throw error;
		}
	}

	async findAll(session?: ClientSession): Promise<AppModel[]> {
		return this.appModel
			.find()
			.populate(this.populate)
			.session(session)
			.exec();
	}

	async findOneById(id: string, session?: ClientSession): Promise<AppModel> {
		const model = await this.appModel
			.findById(id)
			.populate(this.populate)
			.session(session)
			.exec();
		return this.populateModel(model);
	}

	/**
	 * General method to find one by any field
	 * @param filter - Filter query object to find a specific data
	 * @returns A single data document or null if not found
	 */
	public async findOne(
		filter: FilterQuery<AppModel>,
		session?: ClientSession,
		find?: string,
	): Promise<AppModel | null> {
		const model = await this.appModel
			.findOne(filter)
			.session(session)
			.select(find)
			.exec();
		return model || null;
	}

	async update(
		id: string,
		updateDto: UpdateDto,
		session?: ClientSession,
	): Promise<AppModel> {
		try {
			const updatedModel = await this.appModel
				.findByIdAndUpdate(id, updateDto, { new: true, session })
				.populate(this.populate)
				.exec();
			return this.populateModel(updatedModel);
		} catch (error) {
			console.error("AppService > update : ", error);
			throw error;
		}
	}

	async remove(id: string, session?: ClientSession): Promise<void> {
		await this.appModel.findByIdAndDelete(id).session(session).exec();
	}

	async findWhere({
		where,
		sort,
		limit,
		find,
		session,
	}: {
		where: object;
		sort?: string;
		limit?: number;
		find?: string;
		session?: ClientSession;
	}): Promise<AppModel[]> {
		return await this.appModel
			.find(where)
			.sort(sort)
			.populate(this.populate)
			.limit(limit)
			.select(find)
			.session(session)
			.exec();
	}

	async updateMany(
		where: object,
		updateDto: UpdateDto,
		session?: ClientSession,
	): Promise<any> {
		try {
			return await this.appModel
				.updateMany(where, updateDto)
				.session(session)
				.exec();
		} catch (error) {
			console.error("AppService > updateMany : ", error);
			throw error;
		}
	}

	async removeMany(where: object, session?: ClientSession): Promise<object> {
		return await this.appModel.deleteMany(where).session(session).exec();
	}

	protected async populateModel(model: AppModel): Promise<AppModel> {
		return model;
	}
}
