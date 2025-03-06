import { configService } from "@constants/env";
import * as crypto from "crypto";

/**
 * Utility class for cryptographic operations.
 */
export class CryptoHelper {
	private static encryptionKey =
		configService.get<string>("ENCRYPTION_KEY") || "default_encryption_key";
	private static algorithm = "aes-256-ctr";

	/**
	 * Anonymizes an IP address by masking the last segment.
	 *
	 * @param {string} ip - The IP address to anonymize.
	 * @returns {string} - The anonymized IP address.
	 */
	public static anonymizeIp(ip: string): string {
		const parts = ip.split(".");
		if (parts.length === 4) {
			parts[3] = "0";
		}
		return parts.join(".");
	}

	/**
	 * Encrypts a given text using AES-256-CTR algorithm.
	 *
	 * @param {string} text - The text to encrypt.
	 * @returns {string} - The encrypted text in hex format.
	 */
	public static encrypt(text: string): string {
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(
			this.algorithm,
			Buffer.from(this.encryptionKey),
			iv,
		);
		const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
		return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
	}

	/**
	 * Decrypts an encrypted text.
	 *
	 * @param {string} encryptedText - The text to decrypt.
	 * @returns {string} - The decrypted text.
	 */
	public static decrypt(encryptedText: string): string {
		const [iv, encrypted] = encryptedText.split(":");
		const decipher = crypto.createDecipheriv(
			this.algorithm,
			Buffer.from(this.encryptionKey),
			Buffer.from(iv, "hex"),
		);
		const decrypted = Buffer.concat([
			decipher.update(Buffer.from(encrypted, "hex")),
			decipher.final(),
		]);
		return decrypted.toString();
	}

	/**
	 * Anonymizes and encrypts an IP address.
	 *
	 * @param {string} ip - The IP address to anonymize and encrypt.
	 * @returns {string} - The encrypted anonymized IP address.
	 */
	public static anonymizeAndEncryptIp(ip: string): string {
		const anonymizedIp = this.anonymizeIp(ip);
		return this.encrypt(anonymizedIp);
	}

	/**
	 * Generates a unique trace ID for distributed tracing.
	 *
	 * @returns {string} - A unique trace ID.
	 */
	public static generateTraceId(): string {
		return crypto.randomBytes(16).toString("hex");
	}

	/**
	 * Generates a unique request ID.
	 *
	 * @returns {string} - A unique request ID.
	 */
	public static generateRequestId(): string {
		return crypto.randomBytes(16).toString("hex");
	}
}
