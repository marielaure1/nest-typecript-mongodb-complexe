import * as crypto from "crypto";

export class SecurityHelper {
	private static encryptionKey =
		process.env.ENCRYPTION_KEY || "default_encryption_key";
	private static algorithm = "aes-256-ctr";

	public static anonymizeIp(ip: string): string {
		const parts = ip.split(".");
		if (parts.length === 4) {
			parts[3] = "0";
		}
		return parts.join(".");
	}

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

	public static anonymizeAndEncryptIp(ip: string): string {
		const anonymizedIp = this.anonymizeIp(ip);
		return this.encrypt(anonymizedIp);
	}
}
