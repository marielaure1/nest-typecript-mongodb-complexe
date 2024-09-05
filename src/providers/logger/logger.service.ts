import { Logger } from "@nestjs/common";
import { ILoggerService } from "@providers/logger/logger.interface";

export class LoggerService implements ILoggerService {
	private readonly logger = new Logger(LoggerService.name);

	log(message: string): void {
		this.logger.log(message);
	}

	error(message: string, trace?: string): void {
		this.logger.error(message, trace);
	}

	warn(message: string): void {
		this.logger.warn(message);
	}

	debug(message: string): void {
		this.logger.debug(message);
	}

	verbose(message: string): void {
		this.logger.verbose(message);
	}
}
