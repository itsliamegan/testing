export default class Reporter {
	constructor(output) {
		this.output = output
	}

	test(test) {
		return new TestDelegate(this.output, test)
	}

	scenario(scenario) {
		return new ScenarioDelegate(this.output, scenario)
	}
}

class TestDelegate {
	constructor(output, test) {
		this.output = output
		this.test = test
	}

	start() {
		this.output.write(this.test.name)
		this.output.write(" ")
	}

	finish(results) {
		this.output.endline()
		this.output.indent()

		for (let result of results.notable) {
			this.output.write(result.scenario.name)
			this.output.endline()

			this.output.indent()

			this.output.write(result.message)
			this.output.endline()

			this.output.unindent()
		}

		this.output.unindent()
	}
}

class ScenarioDelegate {
	constructor(output, scenario) {
		this.output = output
		this.scenario = scenario
	}

	start() {
	}

	finish(result) {
		let indicator

		if (result.isNotable) {
			indicator = "x"
		} else {
			indicator = "."
		}

		this.output.write(indicator)
	}
}
