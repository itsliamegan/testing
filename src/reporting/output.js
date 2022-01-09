const ENDLINE = "\n"
const TAB = "\t"

export default class Output {
	constructor(stream) {
		this.stream = stream
		this.indentationLevel = 0
		this.isAtStartOfLine = true
	}

	write(text) {
		this.align()
		this.stream.write(text)
		this.isAtStartOfLine = false
	}

	endline() {
		this.stream.write(ENDLINE)
		this.isAtStartOfLine = true
	}

	tabulate() {
		this.stream.write(TAB)
	}

	indent() {
		this.indentationLevel += 1
	}

	unindent() {
		this.indentationLevel -= 1
	}

	align() {
		if (this.isAtStartOfLine) {
			for (let n = 0; n < this.indentationLevel; n++) {
				this.stream.write(TAB)
			}

			this.isAtStartOfLine = false
		}
	}
}
