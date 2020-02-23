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
			: new_element()
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
	g.content += _generate_code_item(item, depth)
	for (var id in item.children) {
		_generate_code(item.children[id], depth)
	}
	g.content += '\n' + '\t'.repeat(depth) + '</Box>'
	depth--
}
function _generate_code_item(item, depth) {
	var code = _generate_code_item_header(item, depth)
	if (item.content) {
		code += item.content
	}
	return code
}
function _generate_code_item_header(item, depth) {
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

	return code.replace(/="true"/g, '')
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
				case 'number':
				case 'undefined': {
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
function update_tree(id, fn, dont_save) {
	fn = action(fn || function() {})
	var items = []
	_update_tree(g.Tree, id, items)
	for (var id in items) {
		fn(items[id].tree, items[id].style, items[id].parent)
	}
	if (!dont_save) {
		save()
	}
	return items
}
function _update_tree(tree, id, items, parent) {
	if (tree.id == id) {
		items.push({ tree: tree, style: tree.style, parent: parent })
	}
	for (var i in tree.children) {
		_update_tree(tree.children[i], id, items, tree)
	}
}

function element_count(id) {
	return update_tree(id, null, true)
}
function get_tree(id) {
	var root = update_tree(id, null, true)
	var items = []
	for (var i in root) {
		_get_tree(root[i].tree, items, root[i].parent)
	}
	return items
}
function _get_tree(tree, items, parent) {
	for (var i in tree.children) {
		items.push({ tree: tree.children[i], style: tree.children[i].style, parent: tree })

		_get_tree(tree.children[i], items, tree)
	}
}

function element_includes(id, element) {
	var elements = get_tree(id)
	for (var id in elements) {
		if (elements[id].tree == element) return true
	}
}

function new_element() {
	return { children: [], style: { grow: true } }
}

const select_item = action(function select_item(item) {
	if (item) {
		if (typeof item == 'string') {
			update_tree(item, function(item, style, parent) {
				select_item(item)
			})
		} else {
			g.Active = item[Symbol.for('instance')]
			Element.updateProps(g.Active)
		}
	} else {
		g.Active = null
	}
})

const g = observable({ Tree: {}, content: '' })

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

const save = action(function save() {
	var hash = JSON.stringify(g.Tree)
		.replace(/^"/, '')
		.replace(/"$/, '')
	var compressed = compress(hash)
	window.location.hash = compressed
	localStorage.setItem('layout-editor-tree', compressed)
})

window.addEventListener('hashchange', reloadTree, false)

ReactDOM.render(<App />, document.getElementById('root'))

reloadTree()
