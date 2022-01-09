import equal from "./support/equal.js"
import print from "./support/print.js"

export function assert(value, message) {
	if (message == undefined) {
		message = `expected ${print(value)} to be truthy`
	}

	if (!value) {
		throw new AssertionError(message)
	}
}

export function assertNot(value, message) {
	if (message == undefined) {
		message = `expected ${print(value)} to be falsey`
	}

	assert(!value, message)
}

export function assertEqual(expected, actual, message) {
	if (message == undefined) {
		message = `expected ${print(actual)} to equal ${print(expected)}`
	}

	assert(equal(expected, actual), message)
}

export function assertThrow(errorType, action) {
	let error

	try {
		action()
	} catch (err) {
		error = err
	}

	if (error == undefined) {
		throw new AssertionError(`expected to throw ${errorType.name}`)
	}
}

export function assertNotThrow(errorType, action) {
	let error

	try {
		action()
	} catch (err) {
		error = err
	}

	if (error != undefined) {
		throw new AssertionError(`expected not to throw ${errorType.name}`)
	}
}

export class AssertionError extends Error {
}
