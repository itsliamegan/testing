export class Results {
	constructor(results = []) {
		this.results = results
	}

	add(result) {
		this.results.push(result)
	}

	get notable() {
		return this.results.filter(result => result.isNotable)
	}
}

export class Pass {
	constructor(test, scenario) {
		this.test = test
		this.scenario = scenario
	}

	get isNotable() {
		return false
	}
}

export class Fail {
	constructor(test, scenario, error) {
		this.test = test
		this.scenario = scenario
		this.error = error
	}

	get isNotable() {
		return true
	}

	get message() {
		return this.error.message
	}
}

export class Error {
	constructor(test, scenario, error) {
		this.test = test
		this.scenario = scenario
		this.error = error
	}

	get isNotable() {
		return true
	}

	get message() {
		return `${this.error.name}: ${this.error.message}`
	}
}
