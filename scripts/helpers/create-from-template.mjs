import fs from "fs";

// Create a file from a template with replacements
function createFileFromTemplate(templatePath, outputPath, replacements) {
	let content = fs.readFileSync(templatePath, "utf8");

	for (const [key, value] of Object.entries(replacements)) {
		content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
	}

	fs.writeFileSync(outputPath, content);
}

export default createFileFromTemplate;
