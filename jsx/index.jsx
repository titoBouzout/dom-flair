'use strict'

function guid() {
	var r = ''
	while (!r) {
		r = Math.random()
			.toString(36)
			.substr(2, 6)
	}
	return r
}

function copy(o) {
	return JSON.parse(JSON.stringify(o))
}

function reloadTree() {
	var Tree =
		hash() != ''
			? JSON.parse(hash())
			: localStorage.getItem('layout-editor-tree') !== null
			? JSON.parse(uncompress(localStorage.getItem('layout-editor-tree')))
			: {
					c: [{}, {}],
			  }
	patch(g.Tree, Tree)

	generate_code()
}

var generate_code = action(function generate_code() {
	g.content = ''
	_generate_code(g.Tree, -1)
	g.content = g.content.replace(/>([^<]+)\n\s+<\/Box>/g, '>$1</Box>')
})

function _generate_code(item, depth) {
	depth++
	g.content += _generate_code_for_item(item, depth)
	for (var id in item.c) {
		_generate_code(item.c[id], depth)
	}
	g.content += '\n' + '\t'.repeat(depth) + '</Box>'
	depth--
}
function _generate_code_for_item(item, depth) {
	var indent = '\t'.repeat(depth)
	var code = '\n' + indent + '<Box'
	if (item.class) {
		code += ' className="' + item.class + '"'
	}
	if (item.style) {
		for (var id in item.style) {
			if (item.style[id] != null) {
				code += ' ' + id + '="' + item.style[id] + '"'
			}
		}
	}
	code += '>'
	if (item.content) {
		code += ' ' + item.content
	}
	return code
}
const patch = action(function patch(observable, data, old) {
	var id,
		to_delete = [],
		old = old || mobx.toJS(observable)

	// DELETE
	for (id in old) {
		if (!(id in data)) {
			to_delete.push(id)
		}
	}
	to_delete.reverse()
	for (id of to_delete) {
		if (observable.remove) {
			observable.remove(observable[id])
		} else {
			switch (typeof observable[id]) {
				case 'string':
				case 'object':
				case 'boolean':
				case 'number': {
					delete observable[id]
					break
				}
				default: {
					console.trace('cant _patch-delete_ unknown typeof', typeof observable[id])
				}
			}
		}
	}

	// PUSH OR UPDATE

	for (id in data) {
		if (id in old) {
			switch (typeof data[id]) {
				case 'string':
				case 'boolean':
				case 'number': {
					if (data[id] != old[id]) {
						observable[id] = data[id]
					}
					break
				}
				case 'object': {
					patch(observable[id], data[id], old[id])
					break
				}
				default: {
					console.trace('cant _patch-copy_ unknown typeof', typeof data[id])
				}
			}
		} else {
			observable[id] = data[id]
		}
	}
})
function patch_array(array, fn) {
	patch(array, fn(mobx.toJS(array)))
}
function update_tree(id, fn) {
	fn = action(fn)
	var items = []
	_update_tree(g.Tree, id, items)
	for (var id in items) {
		fn(items[id].tree, items[id].style, items[id].parent)
	}
	save()
}

function _update_tree(tree, id, items, parent) {
	if (tree.id == id) {
		items.push({ tree: tree, style: tree.style, parent: parent })
	}
	for (var i in tree.c) {
		_update_tree(tree.c[i], id, items, tree)
	}
}

const select_item = action(function select_item(item) {
	g.Active = item[Symbol.for('instance')]
	Element.updateProps(g.Active)
})

const g = observable({ Tree: {} })

;(function(proxied) {
	console.log = function() {
		var a = []
		for (var id in arguments) {
			a.push(mobx.toJS(arguments[id]))
		}
		proxied(...a)
	}
})(console.log)

document.addEventListener(
	'keydown',
	action(function(e) {
		g.ctrlKey = e.ctrlKey
	}),
)

function hash(o) {
	try {
		var hash = uncompress(window.location.hash.replace(/^#/, ''))
			.replace(/^"/, '')
			.replace(/"$/, '')
		return hash
	} catch (e) {
		var hash = decodeURIComponent(window.location.hash)
			.replace(/^#/, '')
			.replace(/^"/, '')
			.replace(/"$/, '')
		return hash
	}
}

function save() {
	var hash = JSON.stringify(g.Tree)
		.replace(/,"[^"]+":false/g, '')
		.replace(/"c":\[\],/g, '')
		.replace(/,"c":\[\]/g, '')
		.replace(/,"style":\{\}/g, '')
		.replace(/":true/g, '":1')
		.replace(/^"/, '')
		.replace(/"$/, '')
	var compressed = compress(hash)
	window.location.hash = compressed
	localStorage.setItem('layout-editor-tree', compressed)
}

window.addEventListener('hashchange', reloadTree, false)

ReactDOM.render(<App />, document.getElementById('root'))

reloadTree()
