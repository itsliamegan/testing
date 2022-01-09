export class StringStream {
	constructor(buffer = "") {
		this.buffer = buffer
	}

	write(text) {
		this.buffer += text
	}

	get value() {
		return this.buffer
	}
}
