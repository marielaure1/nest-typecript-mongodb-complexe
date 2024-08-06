import { fileURLToPath } from "url";
import { dirname, join } from "path";
import inquirer from "inquirer";
import fs from "fs";
import findProjectRoot from "./helpers/find-project-root.mjs";
import {
	camelCaseToKebabCase,
	toPascalCase,
	toCamelCase,
} from "./helpers/format-text.mjs";
import createFileFromTemplate from "./helpers/create-from-template.mjs";

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);

// Get the current file directory
const __dirname = dirname(__filename);

// Find the root of the project
const projectRoot = findProjectRoot(__dirname);
const modulesPath = join(projectRoot, "src/modules");
const templatesPath = join(__dirname, "templates");

// Menu
const generalQuestions = [
	{
		type: "list",
		name: "generationType",
		message: "What do you want to generate?",
		choices: [
			{
				name: "Module Basic",
				value: "module-basic",
				description: "Generate a new module basic",
			},
			{
				name: "Module Crud",
				value: "module-crud",
				description: "Generate a new module crud",
			},
			{
				name: "Service",
				value: "service",
				description: "Generate a new service",
			},
		],
	},
];

// Menu > Module Basic
const moduleBasicQuestions = [
	{
		type: "input",
		name: "moduleName",
		message: "What is the name of the module?",
	},
	{
		type: "confirm",
		name: "moduleController",
		message: "Do you need a controller?",
		default: false,
	},
	{
		type: "confirm",
		name: "moduleService",
		message: "Do you need a service?",
		default: false,
	},
	{
		type: "confirm",
		name: "moduleDto",
		message: "Do you need DTOs?",
		default: false,
	},
	{
		type: "confirm",
		name: "moduleEntities",
		message: "Do you need entities?",
		default: false,
	},
];

// Menu > Module Crud
const moduleCrudQuestions = [
	{
		type: "input",
		name: "moduleName",
		message: "What is the name of the module?",
	},
];

// Menu > Services
const serviceQuestions = [
	{
		type: "input",
		name: "serviceName",
		message: "What is the name of the service?",
	},
];

// Common Variables
let moduleDir;
let variables;

async function main() {
	try {
		const { generationType } = await inquirer.prompt(generalQuestions);

		let specificQuestions = [];
		if (generationType === "module-basic") {
			specificQuestions = moduleBasicQuestions;
		} else if (generationType === "module-crud") {
			specificQuestions = moduleCrudQuestions;
		} else if (generationType === "service") {
			specificQuestions = serviceQuestions;
		}

		const specificAnswers = await inquirer.prompt(specificQuestions);

		let name =
			generationType === "module-basic" ||
			generationType === "module-crud"
				? specificAnswers.moduleName
				: specificAnswers.serviceName;

		if (name.endsWith("s")) {
			name = name.substring(0, name.length - 1);
		}

		let normalizedName = camelCaseToKebabCase(name);
		let directoryName = normalizedName.endsWith("s")
			? normalizedName
			: `${normalizedName}s`;

		moduleDir = join(modulesPath, directoryName);

		variables = {
			kebabCase: normalizedName,
			pascalCase: toPascalCase(name),
			camelCase: toCamelCase(name),
		};

		if (!fs.existsSync(moduleDir)) {
			fs.mkdirSync(moduleDir, { recursive: true });

			if (generationType === "module-basic") {
				if (specificAnswers.moduleController) generateController();
				if (specificAnswers.moduleService) generateService();
				if (specificAnswers.moduleDto) generateDto();
				if (specificAnswers.moduleEntities) generateEntities();
			} else if (generationType === "module-crud") {
				generateModule();
				if (specificAnswers.moduleController) generateController();
				if (specificAnswers.moduleService) generateService();
				if (specificAnswers.moduleDto) generateDto();
				if (specificAnswers.moduleEntities) generateEntities();
			}

			console.log(`Successfully generated ${generationType}.`);
		} else {
			console.log(
				`${generationType.charAt(0).toUpperCase() + generationType.slice(1)} ${name} already exists.`,
			);
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

main();

const generateModule = () => {
	createFileFromTemplate(
		join(templatesPath, "module.template.mjs"),
		join(moduleDir, `${variables.kebabCase}s.module.ts`),
		variables,
	);
};

const generateController = () => {
	createFileFromTemplate(
		join(templatesPath, "controller.template.mjs"),
		join(moduleDir, `${variables.kebabCase}s.controller.ts`),
		variables,
	);
	createFileFromTemplate(
		join(templatesPath, "controller-spect.template.mjs"),
		join(moduleDir, `${variables.kebabCase}s.controller.spect.ts`),
		variables,
	);
};

const generateService = () => {
	createFileFromTemplate(
		join(templatesPath, "service.template.mjs"),
		join(moduleDir, `${variables.kebabCase}s.service.ts`),
		variables,
	);
	createFileFromTemplate(
		join(templatesPath, "service-spect.template.mjs"),
		join(moduleDir, `${variables.kebabCase}s.service.spect.ts`),
		variables,
	);
};

const generateDto = () => {
	if (!fs.existsSync(join(moduleDir, "dto"))) {
		fs.mkdirSync(join(moduleDir, "dto"), { recursive: true });
	}

	createFileFromTemplate(
		join(templatesPath, "create-dto.template.mjs"),
		join(moduleDir, `dto/create-${variables.kebabCase}.dto.ts`),
		variables,
	);
	createFileFromTemplate(
		join(templatesPath, "update-dto.template.mjs"),
		join(moduleDir, `dto/update-${variables.kebabCase}.dto.ts`),
		variables,
	);
};

const generateEntities = () => {
	if (!fs.existsSync(join(moduleDir, "entities"))) {
		fs.mkdirSync(join(moduleDir, "entities"), { recursive: true });
	}

	createFileFromTemplate(
		join(templatesPath, "entity.template.mjs"),
		join(moduleDir, `entities/${variables.kebabCase}.entity.ts`),
		variables,
	);
};
