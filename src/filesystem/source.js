import Suite from "../suite.js"

export default class Source {
	constructor(target) {
		this.target = target
	}

	async load() {
		let files = await this.target.resolve()
		let suite = new Suite()

		for (let file of files) {
			let module = await import(file)
			let test = module.default
			suite.add(test)
		}

		return suite
	}
}
