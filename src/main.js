import path from "path"
import process from "process"
import Output from "./reporting/output.js"
import Reporter from "./reporting/reporter.js"
import Source from "./filesystem/source.js"
import Target from "./filesystem/target.js"
import Test from "./test.js"

export default Test

export async function run() {
	let pattern = path.join(process.cwd(), "test")

	let target = new Target(pattern)
	let source = new Source(target)
	let suite = await source.load()

	let output = new Output(process.stdout)
	let reporter = new Reporter(output)

	await suite.run(reporter)
}
