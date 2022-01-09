import fs from "fs/promises"
import path from "path"

export default class Target {
	constructor(pattern) {
		this.pattern = pattern
	}

	async resolve() {
		let stats = await fs.stat(this.pattern)

		if (stats.isFile()) {
			return [this.pattern]
		} else {
			return this.resolveAllWithin(this.pattern)
		}
	}

	async resolveAllWithin(directory) {
		let paths = []
		let entries = await fs.readdir(directory, {withFileTypes: true})

		for (let entry of entries) {
			let entryPath = path.join(directory, entry.name)

			if (entry.isDirectory()) {
				let innerPaths = await this.resolveAllWithin(entryPath)
				paths = paths.concat(innerPaths)
			} else if (this.isTestFile(entryPath)) {
				paths.push(entryPath)
			}
		}

		return paths
	}

	isTestFile(file) {
		return file.endsWith("_test.js")
	}
}
