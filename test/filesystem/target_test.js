import Test from "testing"
import {temporary} from "./support.js"
import Target from "../../src/filesystem/target.js"

export default class TargetTest extends Test {
	async testResolvesFile() {
		let tempFile = await temporary.file({name: "book_test.js"})
		let target = new Target(tempFile)

		let files = await target.resolve()

		this.assertEqual([tempFile], files)
	}

	async testResolvesDirectory() {
		let tempDir = await temporary.directory({name: "test"})
		let tempFile = await temporary.file({name: "book_test.js", parent: tempDir})
		let target = new Target(tempDir)

		let files = await target.resolve()

		this.assertEqual([tempFile], files)
	}

	async testRecursivelyResolvesDirectory() {
		let outerDir = await temporary.directory({name: "test"})
		let outerFile = await temporary.file({name: "book_test.js", parent: outerDir})
		let innerDir = await temporary.directory({name: "http", parent: outerDir})
		let innerFile = await temporary.file({name: "books_test.js", parent: innerDir})
		let target = new Target(outerDir)

		let files = await target.resolve()

		this.assertEqual([outerFile, innerFile], files)
	}

	async testIgnoresNonTestFiles() {
		let testDir = await temporary.directory({name: "test"})
		let testFile = await temporary.file({name: "book_test.js", parent: testDir})
		let nonTestFile = await temporary.file({name: "support.js", parent: testDir})
		let target = new Target(testDir)

		let files = await target.resolve()

		this.assertEqual([testFile], files)
	}
}

