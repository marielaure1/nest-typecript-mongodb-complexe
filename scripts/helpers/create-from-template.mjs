import fs from "fs";
import ejs from "ejs";

// Create a file from a template with replacements
async function createFileFromTemplate(templatePath, outputPath, replacements) {
	const template = fs.readFileSync(templatePath, "utf8");
	const content = ejs.render(template, replacements);
	fs.writeFileSync(outputPath, content);
}

export default createFileFromTemplate;
