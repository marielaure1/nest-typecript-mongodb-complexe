export class DatabaseHelper {
	static createQueryView(filter: Record<string, any> = {}) {
		const query = {};

		for (const key in filter) {
			if (filter.hasOwnProperty(key)) {
				query[key] = filter[key];
			}
		}
		return query;
	}
}
