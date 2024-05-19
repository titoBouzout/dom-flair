/*
	TODO
	- be more clever at the attributes parsing and including
	- generate dynamically child-* and all-*
*/
const fs = require('fs')

const list = new Map()
const styles = makeListIndex()
const reset = fs.readFileSync(__dirname + '/../css/reset.css', 'utf8')
function makeListIndex() {
	const styles = fs.readFileSync(__dirname + '/../css/index.css', 'utf8').split('}')

	// remove last empty element
	styles.pop()

	// parse
	for (let k in styles) {
		styles[k] = {
			content: styles[k] + '}',
			matches: styles[k]
				// composed attributes should be added only when the composed value is used
				.replace(/\[flair~='row'\]\[/gi, '[')
				.replace(/\[flair~='col'\]\[/gi, '[')
				.replace(/\[flair~='column'\]\[/gi, '[')
				// match the [attribute-name]
				.match(/\[([^\]]+)]/gi),
		}
		for (let id in styles[k].matches) {
			// clean the attributes
			styles[k].matches[id] = styles[k].matches[id]
				.replace(/flair~=/g, '')
				.replace(/^\[/, '')
				.replace(/].*/, '')
				.replace(/=.*/, '')
				.replace(/'/g, '')
				.replace(/"/g, '')
			if (!list.has(styles[k].matches[id])) {
				list.set(styles[k].matches[id], new Set())
			}
			styles[k].matches[id] = list.get(styles[k].matches[id])
		}
	}

	return styles
}

module.exports = function (api, options) {
	const files2styles = new Map()

	// write
	let previousContent = ''

	const write = function write(state) {
		clearTimeout(state.timeout)
		state.timeout = setTimeout(() => {
			let content = options.reset ? reset : ''
			for (let k in styles) {
				if (styles[k].matches.some(set => set.size)) {
					content += styles[k].content
				}
			}
			if (content != previousContent) {
				previousContent = content
				fs.writeFile(options.path, content, () => {})
			}
		}, 100)
	}.bind(null, { timeout: 0 })

	return {
		visitor: {
			Program(path, state) {
				// reset styles for filename
				const filename = state.filename

				if (files2styles.has(filename)) {
					files2styles.get(filename).forEach(set => {
						set.delete(filename)
					})
				}
				write()
			},
			JSXElement(path, state) {
				const filename = state.filename
				path.traverse(
					{
						JSXOpeningElement(path, state) {
							for (let node of path.node.attributes) {
								if (!node.name || !node.name.name) continue
								const name = node.name.name
								if (name === 'flair') {
									// <div flair/> // no value for attribute
									if (!node.value) continue

									const attributes = node.value.value.trim().split(/\s+/)
									for (const name of attributes) {
										if (list.has(name)) {
											const set = list.get(name)
											set.add(filename)
											if (!files2styles.has(filename)) {
												files2styles.set(filename, new Set())
											}
											files2styles.get(filename).add(set)

											write()
										}
									}
								}
							}
						},
					},
					state,
				)
			},
		},
	}
}
