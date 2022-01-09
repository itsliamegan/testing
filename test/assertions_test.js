import Test from "testing"
import {AssertionError} from "testing/assertions"

export default class AssertionsTest extends Test {
	testAssertsCondition() {
		this.assertNotThrow(AssertionError, () => {
			this.assert(true)
		})

		this.assertThrow(AssertionError, () => {
			this.assert(false)
		})
	}

	testAssertsNotCondition() {
		this.assertNotThrow(AssertionError, () => {
			this.assertNot(false)
		})

		this.assertThrow(AssertionError, () => {
			this.assertNot(true)
		})
	}

	testAssertsEquality() {
		this.assertNotThrow(AssertionError, () => {
			this.assertEqual(1, 1)
		})

		this.assertThrow(AssertionError, () => {
			this.assertEqual(1, 2)
		})
	}
}
