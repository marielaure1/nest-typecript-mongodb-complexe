import { Logger } from "@nestjs/common";
import { ILoggerService } from "@providers/logger/logger.interface";

/**
 * Logger service implementing `ILoggerService`.
 * Provides logging functionality using NestJS's built-in `Logger`.
 */
export class LoggerService implements ILoggerService {
	private readonly logger = new Logger(LoggerService.name);

	/**
	 * Logs a standard message.
	 *
	 * @param {string} message - The message to log.
	 */
	log(message: string): void {
		this.logger.log(message);
	}

	/**
	 * Logs an error message.
	 *
	 * @param {string} message - The error message.
	 * @param {string} [trace] - Optional stack trace or additional error details.
	 */
	error(message: string, trace?: string): void {
		this.logger.error(message, trace);
	}

	/**
	 * Logs a warning message.
	 *
	 * @param {string} message - The warning message.
	 */
	warn(message: string): void {
		this.logger.warn(message);
	}

	/**
	 * Logs a debug message.
	 *
	 * @param {string} message - The debug message.
	 */
	debug(message: string): void {
		this.logger.debug(message);
	}

	/**
	 * Logs a verbose message.
	 *
	 * @param {string} message - The verbose message.
	 */
	verbose(message: string): void {
		this.logger.verbose(message);
	}
}
