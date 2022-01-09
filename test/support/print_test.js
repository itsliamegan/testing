import Test from "testing"
import print from "../../src/support/print.js"

export default class PrintTest extends Test {
	testPrintsPrimitives() {
		this.assertEqual("\"string\"", print("string"))
		this.assertEqual("10", print(10))
		this.assertEqual("false", print(false))
		this.assertEqual("undefined", print(undefined))
		this.assertEqual("null", print(null))
	}

	testPrintsArray() {
		this.assertEqual("[1, \"string\", false]", print([1, "string", false]))
	}

	testPrintsStringWithEscapeSequences() {
		this.assertEqual("\"line\\n\\tline\"", print("line\n\tline"))
	}
}
