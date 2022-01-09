export default class Suite {
	constructor(tests = []) {
		this.tests = tests
	}

	async run(listener) {
		for (let test of this.tests) {
			await test.run(listener)
		}
	}

	add(test) {
		this.tests.push(test)
	}
}
