import {AssertionError} from "./assertions.js"
import {Pass, Fail, Error} from "./result.js"

export default class Scenario {
	constructor(test, action) {
		this.test = test
		this.action = action
	}

	async run(listener) {
		listener.scenario(this).start()

		let instance = new this.test()
		let action = this.action.bind(instance)

		let result

		try {
			await action()
			result = new Pass(this.test, this)
		} catch (error) {
			if (error instanceof AssertionError) {
				result = new Fail(this.test, this, error)
			} else {
				result = new Error(this.test, this, error)
			}
		}

		listener.scenario(this).finish(result)

		return result
	}

	get name() {
		return this.action.name
	}
}
