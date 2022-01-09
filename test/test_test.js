import Test from "testing"

export default class TestTest extends Test {
	testGetsAllScenarios() {
		class BookTest extends Test {
			testAuthor() {
			}

			testPublished() {
			}
		}

		this.assertEqual(2, BookTest.scenarios.length)
	}

	testGetsOneScenario() {
		class BookTest extends Test {
			testAuthor() {
			}
		}

		let scenario = BookTest.scenario("testAuthor")

		this.assert(scenario)
	}
}
