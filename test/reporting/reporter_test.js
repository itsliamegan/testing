import Test from "testing"
import {AssertionError} from "testing/assertions"
import {Results, Pass, Fail, Error} from "../../src/result.js"
import Output from "../../src/reporting/output.js"
import {StringStream} from "./support.js"
import Reporter from "../../src/reporting/reporter.js"

export default class ReporterTest extends Test {
	testReportsPass() {
		class BookTest extends Test {
			testAuthor() {
			}
		}

		let scenario = BookTest.scenario("testAuthor")
		let result = new Pass(BookTest, scenario)
		let results = new Results([result])
		let stream = new StringStream()
		let output = new Output(stream)
		let reporter = new Reporter(output)

		reporter.test(BookTest).start()
		reporter.scenario(scenario).start()
		reporter.scenario(scenario).finish(result)
		reporter.test(BookTest).finish(results)

		this.assertEqual("BookTest .\n", stream.value)
	}

	testReportsMultiplePasses() {
		class BookTest extends Test {
			testAuthor() {
			}

			testPublish() {
			}
		}

		let scenario1 = BookTest.scenario("testAuthor")
		let scenario2 = BookTest.scenario("testPublish")
		let result1 = new Pass(BookTest, scenario1)
		let result2 = new Pass(BookTest, scenario2)
		let results = new Results([result1, result2])
		let stream = new StringStream()
		let output = new Output(stream)
		let reporter = new Reporter(output)

		reporter.test(BookTest).start()
		reporter.scenario(scenario1).start()
		reporter.scenario(scenario1).finish(result1)
		reporter.scenario(scenario2).start()
		reporter.scenario(scenario2).finish(result2)
		reporter.test(BookTest).finish(results)

		this.assertEqual("BookTest ..\n", stream.value)
	}

	testReportsFail() {
		class BookTest extends Test {
			testAuthor() {
			}
		}

		let scenario = BookTest.scenario("testAuthor")
		let result = new Fail(BookTest, scenario, new AssertionError("message"))
		let results = new Results([result])
		let stream = new StringStream()
		let output = new Output(stream)
		let reporter = new Reporter(output)

		reporter.test(BookTest).start()
		reporter.scenario(scenario).start()
		reporter.scenario(scenario).finish(result)
		reporter.test(BookTest).finish(results)

		this.assertEqual("BookTest x\n\ttestAuthor\n\t\tmessage\n", stream.value)
	}

	testReportsMultipleFails() {
		class BookTest extends Test {
			testAuthor() {
			}

			testPublish() {
			}
		}

		let scenario1 = BookTest.scenario("testAuthor")
		let scenario2 = BookTest.scenario("testPublish")
		let result1 = new Fail(BookTest, scenario1, new AssertionError("message"))
		let result2 = new Fail(BookTest, scenario2, new AssertionError("other message"))
		let results = new Results([result1, result2])
		let stream = new StringStream()
		let output = new Output(stream)
		let reporter = new Reporter(output)

		reporter.test(BookTest).start()
		reporter.scenario(scenario1).start()
		reporter.scenario(scenario1).finish(result1)
		reporter.scenario(scenario2).start()
		reporter.scenario(scenario2).finish(result2)
		reporter.test(BookTest).finish(results)

		this.assertEqual(
			"BookTest xx\n\ttestAuthor\n\t\tmessage\n\ttestPublish\n\t\tother message\n",
			stream.value
		)
	}

	testReportsError() {
		class BookTest extends Test {
			testAuthor() {
			}
		}

		let scenario = BookTest.scenario("testAuthor")
		let result = new Error(BookTest, scenario, new TypeError("message"))
		let results = new Results([result])
		let stream = new StringStream()
		let output = new Output(stream)
		let reporter = new Reporter(output)

		reporter.test(BookTest).start()
		reporter.scenario(scenario).start()
		reporter.scenario(scenario).finish(result)
		reporter.test(BookTest).finish(results)

		this.assertEqual("BookTest x\n\ttestAuthor\n\t\tTypeError: message\n", stream.value)
	}
}
