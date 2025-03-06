import { Injectable, Logger } from "@nestjs/common";
import { Model, Document, ClientSession, FilterQuery } from "mongoose";

let logger = new Logger();

/**
 * Generic service for handling CRUD operations on a Mongoose model.
 *
 * @template AppModel - The Mongoose document type.
 * @template CreateDto - The DTO used for creating a resource.
 * @template UpdateDto - The DTO used for updating a resource.
 */
@Injectable()
export abstract class AppService<
	AppModel extends Document,
	CreateDto,
	UpdateDto,
> {
	/**
	 * Initializes the AppService.
	 *
	 * @param {Model<AppModel>} appModel - The Mongoose model to interact with.
	 * @param {Array<string>} [populate=[]] - Fields to populate in queries.
	 */
	constructor(
		protected readonly appModel: Model<AppModel>,
		public readonly populate: Array<string> = [],
	) {}

	/**
	 * Creates a new resource.
	 *
	 * @param {CreateDto} createDto - The data for creating the resource.
	 * @param {ClientSession} [session] - Optional MongoDB transaction session.
	 * @returns {Promise<AppModel>} - The created document.
	 */
	async create({
		createDto,
		session,
	}: {
		createDto: CreateDto;
		session?: ClientSession;
	}): Promise<AppModel> {
		try {
			const createdModel = new this.appModel(createDto);
			await createdModel.save({ session });
			return this.populateModel(createdModel);
		} catch (error: any) {
			logger.error(
				`[ERROR] => AppModule > AppController > create : `,
				error,
			);
			throw error;
		}
	}

	/**
	 * Creates multiple resources.
	 *
	 * @param {CreateDto[]} createDtos - The data for creating the resources.
	 * @param {ClientSession} [session] - Optional MongoDB transaction session.
	 * @returns {Promise<AppModel[]>} - The created documents.
	 */
	async createMany({
		createDtos,
		session,
	}: {
		createDtos: CreateDto[];
		session?: ClientSession;
	}): Promise<AppModel[]> {
		try {
			const createdModels = (await this.appModel.insertMany(createDtos, {
				session,
			})) as unknown as AppModel[];
			return Promise.all(
				createdModels.map((model) => this.populateModel(model)),
			);
		} catch (error: any) {
			logger.error(
				`[ERROR] => AppModule > AppController > createMany : `,
				error,
			);
			throw error;
		}
	}

	/**
	 * Retrieves all documents matching the given query.
	 *
	 * @param {object} [find] - Query filter conditions.
	 * @param {ClientSession} [session] - Optional MongoDB transaction session.
	 * @returns {Promise<AppModel[]>} - An array of matching documents.
	 */
	async findAll({
		find,
		session,
	}: {
		find?: object;
		session?: ClientSession;
	}): Promise<AppModel[]> {
		try {
			return await this.appModel
				.find(find)
				.populate(this.populate)
				.session(session)
				.exec();
		} catch (error: any) {
			logger.error(
				`[ERROR] => AppModule > AppController > findAll : `,
				error,
			);
			throw error;
		}
	}

	/**
	 * Finds a document by its ID.
	 *
	 * @param {string} id - The ID of the document to retrieve.
	 * @param {ClientSession} [session] - Optional MongoDB transaction session.
	 * @returns {Promise<AppModel>} - The found document.
	 */
	async findOneById({
		id,
		session,
	}: {
		id: string;
		session?: ClientSession;
	}): Promise<AppModel> {
		try {
			const model = await this.appModel
				.findById(id)
				.populate(this.populate)
				.session(session)
				.exec();

			return this.populateModel(model);
		} catch (error: any) {
			logger.error(
				`[ERROR] => AppModule > AppController > findOneById : `,
				error,
			);
			throw error;
		}
	}

	/**
	 * Finds multiple documents by an array of IDs.
	 *
	 * @param {string[]} ids - Array of document IDs.
	 * @param {ClientSession} [session] - Optional MongoDB transaction session.
	 * @returns {Promise<AppModel[]>} - An array of found documents.
	 */
	async findManyByIds({
		ids,
		session,
	}: {
		ids: string[];
		session?: ClientSession;
	}): Promise<AppModel[]> {
		try {
			return await this.appModel
				.find({
					_id: {
						$in: ids,
					},
				})
				.populate(this.populate)
				.session(session)
				.exec();
		} catch (error: any) {
			logger.error(
				`[ERROR] => AppModule > AppController > findManyByIds : `,
				error,
			);
			throw error;
		}
	}

	/**
	 * General method to find one by any field
	 * @param filter - Filter query object to find a specific data
	 * @returns A single data document or null if not found
	 */
	public async findOne({
		filter,
		session,
		find,
	}: {
		filter: FilterQuery<AppModel>;
		session?: ClientSession;
		find?: string;
	}): Promise<AppModel | null> {
		try {
			const model = await this.appModel
				.findOne(filter)
				.session(session)
				.select(find)
				.exec();
			return model || null;
		} catch (error: any) {
			logger.error(
				`[ERROR] => AppModule > AppController > findOne : `,
				error,
			);
			throw error;
		}
	}

	/**
	 * Finds multiple documents based on a query condition.
	 *
	 * @param {object} where - Query filter conditions.
	 * @param {object} [projection] - Fields to project.
	 * @param {string} [sort] - Sorting criteria.
	 * @param {number} [limit] - Limit of results.
	 * @param {string} [find] - Fields to select.
	 * @param {ClientSession} [session] - Optional MongoDB transaction session.
	 * @returns {Promise<AppModel[]>} - An array of found documents.
	 */
	async findWhere({
		where,
		projection,
		sort,
		limit,
		find,
		session,
	}: {
		where: object;
		projection?: object;
		sort?: string;
		limit?: number;
		find?: string;
		session?: ClientSession;
	}): Promise<AppModel[]> {
		try {
			return await this.appModel
				.find(where, projection)
				.sort(sort)
				.populate(this.populate)
				.limit(limit)
				.select(find)
				.session(session)
				.exec();
		} catch (error: any) {
			logger.error(
				`[ERROR] => AppModule > AppController > findWhere : `,
				error,
			);
			throw error;
		}
	}

	/**
	 * Updates a document by its ID.
	 *
	 * @param {string} id - The ID of the document to update.
	 * @param {UpdateDto} updateDto - The data for updating the document.
	 * @param {ClientSession} [session] - Optional MongoDB transaction session.
	 * @returns {Promise<AppModel>} - The updated document.
	 */
	async update({
		id,
		updateDto,
		session,
	}: {
		id: string;
		updateDto: UpdateDto;
		session?: ClientSession;
	}): Promise<AppModel> {
		try {
			const updatedModel = await this.appModel
				.findByIdAndUpdate(id, updateDto, { new: true, session })
				.populate(this.populate)
				.exec();
			return this.populateModel(updatedModel);
		} catch (error: any) {
			logger.error(
				`[ERROR] => AppModule > AppController > update : `,
				error,
			);
			throw error;
		}
	}

	/**
	 * Updates multiple documents based on a query condition.
	 *
	 * @param {object} where - Query filter conditions.
	 * @param {UpdateDto} updateDto - The data for updating documents.
	 * @param {ClientSession} [session] - Optional MongoDB transaction session.
	 * @returns {Promise<any>} - The result of the update operation.
	 */
	async updateMany({
		where,
		updateDto,
		session,
	}: {
		where: object;
		updateDto: UpdateDto;
		session?: ClientSession;
	}): Promise<any> {
		try {
			return await this.appModel
				.updateMany(where, updateDto)
				.session(session)
				.exec();
		} catch (error: any) {
			logger.error(
				`[ERROR] => AppModule > AppController > updateMany : `,
				error,
			);
			throw error;
		}
	}

	/**
	 * Deletes a document by its ID.
	 *
	 * @param {string} id - The ID of the document to delete.
	 * @param {ClientSession} [session] - Optional MongoDB transaction session.
	 * @returns {Promise<void>} - Resolves when deletion is complete.
	 */
	async remove({
		id,
		session,
	}: {
		id: string;
		session?: ClientSession;
	}): Promise<void> {
		await this.appModel.findByIdAndDelete(id).session(session).exec();
	}

	/**
	 * Deletes multiple documents based on a query condition.
	 *
	 * @param {object} where - Query filter conditions.
	 * @param {ClientSession} [session] - Optional MongoDB transaction session.
	 * @returns {Promise<object>} - The result of the delete operation.
	 */
	async removeMany({
		where,
		session,
	}: {
		where: object;
		session?: ClientSession;
	}): Promise<object> {
		try {
			return await this.appModel
				.deleteMany(where)
				.session(session)
				.exec();
		} catch (error: any) {
			logger.error(
				`[ERROR] => AppModule > AppController > removeMany : `,
				error,
			);
			throw error;
		}
	}

	/**
	 * Populates a given model with the defined populate fields.
	 *
	 * @param {AppModel} model - The model to populate.
	 * @returns {Promise<AppModel>} - The populated model.
	 */
	protected async populateModel(model: AppModel): Promise<AppModel> {
		return model;
	}
}
