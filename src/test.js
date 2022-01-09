import {
	assert,
	assertNot,
	assertEqual,
	assertThrow,
	assertNotThrow
} from "./assertions.js"
import {Results} from "./result.js"
import Scenario from "./scenario.js"

export default class Test {
	assert = assert
	assertNot = assertNot
	assertEqual = assertEqual
	assertThrow = assertThrow
	assertNotThrow = assertNotThrow

	static async run(listener) {
		listener.test(this).start()

		let results = new Results()
		for (let scenario of this.scenarios) {
			let result = await scenario.run(listener)
			results.add(result)
		}

		listener.test(this).finish(results)
	}

	static scenario(name) {
		return this.scenarios.find(scenario => scenario.name == name)
	}

	static get scenarios() {
		return this.methods
			.filter(method => method.name.startsWith("test"))
			.map(method => new Scenario(this, method))
	}

	static get methods() {
		return this.properties
			.filter(property => typeof property.value == "function")
			.map(property => property.value)
	}

	static get properties() {
		let descriptors = Object.getOwnPropertyDescriptors(this.prototype)

		return Object
			.entries(descriptors)
			.map(([name, descriptor]) => ({name, value: descriptor.value}))
	}
}
