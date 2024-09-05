import "@src/fastify";

declare module "fastify" {
	interface FastifyRequest {
		requestId?: string;
		traceId?: string;
	}
}
