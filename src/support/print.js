const ESCAPE_SEQUENCE_TRANSLATIONS = new Map([
	["\n", "\\n"],
	["\t", "\\t"]
])

export default function print(value) {
	if (value === null) {
		return "null"
	}

	if (value === undefined) {
		return "undefined"
	}

	if (typeof value == "string") {
		return `"${visualize(value)}"`
	}

	if (Array.isArray(value)) {
		let values = value.map(innerValue => print(innerValue))
		let args = values.join(", ")

		return `[${args}]`
	}

	return value.toString()
}

function visualize(string) {
	for (let [sequence, translation] of ESCAPE_SEQUENCE_TRANSLATIONS.entries()) {
		string = string.replaceAll(sequence, translation)
	}

	return string
}
