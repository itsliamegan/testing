import crypto from "crypto"
import fs from "fs/promises"
import os from "os"
import path from "path"
import proces from "process"

process.setMaxListeners(0)

export let temporary = {
	async file({name, contents, parent}) {
		if (name != undefined && parent == undefined) {
			parent = await temporary.directory({parent: os.tmpdir()})
		}

		if (name == undefined) {
			name = temporary.name()
		}

		if (contents == undefined) {
			contents = ""
		}

		if (parent == undefined) {
			parent = os.tmpdir()
		}

		let file = path.join(parent, name)
		await fs.writeFile(file, contents)

		onExit(() => {
			fs.rm(file)
		})

		return file
	},
	
	async directory({name, parent}) {
		if (name != undefined && parent == undefined) {
			parent = await temporary.directory({parent: os.tmpdir()})
		}

		if (name == undefined) {
			name = temporary.name()
		}

		if (parent == undefined) {
			parent = os.tmpdir()
		}

		let dir = path.join(parent, name)
		await fs.mkdir(dir)

		onExit(() => {
			fs.rm(dir, {recursive: true})
		})

		return dir
	},

	name() {
		return crypto.randomBytes(4).toString("hex")
	}
}

function onExit(action) {
	process.on("exit", () => {
		action()
	})
}
