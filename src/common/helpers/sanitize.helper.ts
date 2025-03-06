import sanitizeHtml from "sanitize-html";

export class SanitizeHelper {
	public static sanitizeWysiwygInput(input: string): string {
		return sanitizeHtml(input, {
			allowedTags: [
				"p",
				"br",
				"strong",
				"em",
				"ul",
				"ol",
				"li",
				"a",
				"img",
				"h1",
				"h2",
				"h3",
				"blockquote",
			],
			allowedAttributes: {
				a: ["href", "name", "target"],
				img: ["src", "alt"],
			},
			allowedSchemes: ["http", "https", "data"],
		});
	}
}
