// Convert camelCase to kebab-case
function camelCaseToKebabCase(name) {
	return name
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]/g, "-")
		.toLowerCase();
}

// Convert to PascalCase
function toPascalCase(name) {
	return name.replace(/(^\w|-\w)/g, clearAndUpper).replace(/-/g, "");
}

// Convert to CamelCase
function toCamelCase(name) {
	return name.replace(/([-_][a-z])/g, (group) =>
		group.toUpperCase().replace("-", "").replace("_", ""),
	);
}

// Convert "-" to Uppercase
function clearAndUpper(text) {
	return text.replace(/-/, "").toUpperCase();
}

export { camelCaseToKebabCase, toPascalCase, toCamelCase, clearAndUpper };
