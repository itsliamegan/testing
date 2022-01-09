export default function equal(left, right) {
	if (isPrimitive(left) || isPrimitive(right)) {
		return primitiveEqual(left, right)
	} else {
		return objectEqual(left, right)
	}
}

function primitiveEqual(left, right) {
	return left === right
}

function objectEqual(left, right) {
	for (let [key, innerLeft] of Object.entries(left)) {
		let innerRight = right[key]

		if (!equal(innerLeft, innerRight)) {
			return false
		}
	}

	for (let [key, innerRight] of Object.entries(right)) {
		let innerLeft = left[key]

		if (!equal(innerLeft, innerRight)) {
			return false
		}
	}

	return true
}

function isPrimitive(value) {
	return value === null || typeof value != "object"
}
