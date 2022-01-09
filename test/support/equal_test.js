import Test from "testing"
import equal from "../../src/support/equal.js"

export default class EqualTest extends Test {
	testComparesPrimitivesOfSameType() {
		this.assert(equal(1, 1))
		this.assert(equal("abc", "abc"))
		this.assert(equal(true, true))
		this.assertNot(equal(1, 2))
		this.assertNot(equal("abc", "def"))
		this.assertNot(equal(true, false))
	}

	testComparesPrimitivesOfDifferentTypes() {
		this.assertNot(equal("a", 1))
		this.assertNot(equal(false, 0))
		this.assertNot(equal(2, "2"))
		this.assertNot(equal(null, undefined))
	}

	testComparesObjectsWithSamePrimitiveEntries() {
		this.assert(equal({
			title: "A Book",
			published: 1995,
		}, {
			title: "A Book",
			published: 1995
		}))

		this.assertNot(equal({
			title: "A Book",
			published: 1995
		}, {
			key1: "A Different Book",
			published: 1995
		}))
	}

	testComparesObjectsWithSameObjectEntries() {
		this.assert(equal({
			books: [{title: "A Book"}],
			stats: {count: 1}
		}, {
			books: [{title: "A Book"}],
			stats: {count: 1}
		}))

		this.assertNot(equal({
			books: [{title: "A Book"}],
			stats: {count: 1}
		}, {
			books: [{title: "A Book"}, {title: "A Different Book"}],
			stats: {count: 2},
		}))
	}

	testComparesObjectsWithAddedKey() {
		this.assertNot(equal({
			title: "A Book",
			published: 1995,
		}, {
			title: "A Book",
			author: "John Smith",
			published: 1995
		}))
	}
}
