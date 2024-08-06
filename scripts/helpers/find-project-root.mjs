import fs from "fs";
import { dirname, join } from "path";

function findProjectRoot(startPath) {
	let currentPath = startPath;

	while (
		currentPath !== "/" &&
		!fs.existsSync(join(currentPath, "package.json"))
	) {
		currentPath = dirname(currentPath);
	}

	if (currentPath === "/") {
		throw new Error("Cannot find project root. No package.json found.");
	}

	return currentPath;
}

export default findProjectRoot;
