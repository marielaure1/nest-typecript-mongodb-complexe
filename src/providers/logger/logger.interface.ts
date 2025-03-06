/**
 * Interface for a logging service.
 * Defines methods for logging messages at different levels.
 */
export interface ILoggerService {
	/**
	 * Logs a standard message.
	 *
	 * @param {string} message - The message to log.
	 */
	log(message: string): void;

	/**
	 * Logs an error message with an optional stack trace.
	 *
	 * @param {string} message - The error message.
	 * @param {string} [trace] - Optional stack trace or additional error details.
	 */
	error(message: string, trace?: string): void;

	/**
	 * Logs a warning message.
	 *
	 * @param {string} message - The warning message.
	 */
	warn(message: string): void;

	/**
	 * Logs a debug message.
	 *
	 * @param {string} message - The debug message.
	 */
	debug(message: string): void;

	/**
	 * Logs a verbose message.
	 *
	 * @param {string} message - The verbose message.
	 */
	verbose(message: string): void;
}
