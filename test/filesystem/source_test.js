import Test from "testing"
import {temporary} from "./support.js"
import Source from "../../src/filesystem/source.js"

export default class SourceTest extends Test {
	async testImportsAndInstantiatesTargetTests() {
		let tempfile = await temporary.file({
			name: "book_test.js",
			contents: "module.exports = class BookTest {}"
		})
		let target = {resolve() {return [tempfile]}}
		let source = new Source(target)

		let suite = await source.load()

		this.assertEqual(1, suite.tests.length)
	}
}
