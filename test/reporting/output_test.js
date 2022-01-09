import Test from "testing"
import {StringStream} from "./support.js"
import Output from "../../src/reporting/output.js"

export default class OutputTest extends Test {
	testWritesText() {
		let stream = new StringStream()
		let output = new Output(stream)

		output.write("BookTest")

		this.assertEqual("BookTest", stream.value)
	}

	testWritesLine() {
		let stream = new StringStream()
		let output = new Output(stream)

		output.write("BookTest")
		output.endline()

		this.assertEqual("BookTest\n", stream.value)
	}

	testWritesTab() {
		let stream = new StringStream()
		let output = new Output(stream)

		output.write("testAuthor")
		output.tabulate()
		output.write("(pass)")

		this.assertEqual("testAuthor\t(pass)", stream.value)
	}

	testIndents() {
		let stream = new StringStream()
		let output = new Output(stream)

		output.indent()
		output.write("testAuthor (pass)")

		this.assertEqual("\ttestAuthor (pass)", stream.value)
	}

	testOnlyWritesIndentOnNewLine() {
		let stream = new StringStream()
		let output = new Output(stream)

		output.indent()
		output.write("testAuthor")
		output.write(" (pass)")
		output.endline()
		output.write("testPublish (pass)")

		this.assertEqual("\ttestAuthor (pass)\n\ttestPublish (pass)", stream.value)
	}

	testIndentsThenUnindents() {
		let stream = new StringStream()
		let output = new Output(stream)

		output.write("BookTest")
		output.endline()
		output.indent()
		output.write("testAuthor (pass)")
		output.endline()
		output.unindent()
		output.write("LibraryTest")

		this.assertEqual("BookTest\n\ttestAuthor (pass)\nLibraryTest", stream.value)
	}
}
