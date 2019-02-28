class Style {
	debug = false

	element = 'div'

	parent = []
	parent_counter = 0

	properties = {}
	properties_counter = 0

	sheet_rules = 0
	sheet_queue = [
		// default style for html, body, and root div
		`
			html,
			body {
				border: 0;
				margin: 0;
				padding: 0;
				overflow: hidden;
				width: 100%;
				height: 100%;
				position: fixed;
			}
		`,
		`
			body > div {
				display: flex;
				width: 100%;
				height: 100%;
				position: fixed;
				z-index: 1;
			}
		`,
	]

	css_property = {
		// LAYOUT

		row: `
			display: flex;
			flex-direction: row;
			min-height: 0;
			min-width: 0;

			align-content: flex-start;
			justify-content: flex-start;
			justify-items: flex-start;
			align-items: flex-start;
		`,
		col: `
			display: flex;
			flex-direction: column;
			min-height: 0;
			min-width: 0;

			align-content: flex-start;
			justify-content: flex-start;
			justify-items: flex-start;
			align-items: flex-start;
		`,
		grow: `
			display: flex;
			flex: 1;
			align-self: stretch;
			min-height: 0;
			min-width: 0;

			align-content: flex-start;
			justify-content: flex-start;
			justify-items: flex-start;
			align-items: flex-start;
		`,
		wrap: `
			display: flex;
			flex-wrap: wrap;
		`,
		nowrap: `
			flex-wrap: nowrap;
		`,

		// TEXT

		text: 'line-height:1.4;',

		'text-crop': `
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			min-width: 0;
			min-height: 0;
		`,

		'text-nowrap': `
			white-space: nowrap;
		`,

		'text-wrap': `
			overflow-wrap: break-word;
			word-break: break-word;
			min-height: 0;
			min-width: 0;
		`,

		// SCROLL

		scroll: `
			overflow: auto;
			transform: translateZ(0);
			will-change: scroll-position;
			min-height: 0;
			min-width: 0;
		`,
		'scroll-y': `
			overflow-y: auto;
			overflow-x: hidden;
			transform: translateZ(0);
			will-change: scroll-position;
			min-height: 0;
		`,
		'scroll-x': `
			overflow-x: auto;
			overflow-y: hidden;
			transform: translateZ(0);
			will-change: scroll-position;
			min-width: 0;
		`,

		// DISPLAY

		block: 'display:block;',
		inline: 'display:inline;',
		'inline-block': 'display:inline-block;',

		relative: 'position:relative;',
		absolute: 'position:absolute;',
		fixed: 'position:fixed;top:0;left:0;',

		full: `
			width: 100%;
			height: 100%;
			max-width: 100%;
			max-height: 100%;
			overflow: hidden;
			box-sizing: border-box; // has height/width so border-box
		`,

		overflow: 'overflow:hidden;',
		layer: 'transform:translateZ(0);',

		// CURSOR

		hand: 'cursor:pointer;',
		ignore: 'pointer-events:none;',
		'no-select': 'user-select:none;',

		// FONT

		small: 'font-size:small;',
		bold: 'font-weight:bold;',
		'no-bold': 'font-weight:normal;',
		underline: 'text-decoration:underline;',
		'no-underline': 'text-decoration:none;',
		uppercase: 'text-transform:uppercase;',
		capitalize: 'text-transform:capitalize;',
	}
	css_property_value = {
		padding: 'padding:',
		p: 'padding:',
		pb: 'padding-bottom:',
		pl: 'padding-left:',
		pr: 'padding-right:',
		pt: 'padding-top:',

		margin: 'margin:',
		m: 'margin:',
		mb: 'margin-bottom:',
		ml: 'margin-left:',
		mr: 'margin-right:',
		mt: 'margin-top:',

		border: 'border:',
		b: 'border:',
		bb: 'border-bottom:',
		bl: 'border-left:',
		br: 'border-right:',
		bt: 'border-top:',

		w: 'width:',
		'max-w': 'max-width:',
		'min-w': 'min-width:',

		h: 'height:',
		'max-h': 'max-height:',
		'min-h': 'min-height:',

		z: 'z-index:',

		align: 'text-align:',

		size: 'font-size:',

		basis: 'flex-basis:',
	}
	define_attribute(name, fn) {
		this.css_property_fn[name] = fn
	}
	css_property_fn = {
		// main axis
		// justify-content space between items
		// justify-items for the default justify-self
		// justify-self alignment

		// cross axis
		// align-content space between items
		// align-items for the default align-self
		// align-self alignment

		left: function(value, props, style_hp) {
			if (props.col) {
				// the default not tested
				style_hp.value += `
					align-content: flex-start;
					align-items: flex-start;
				`
			} else {
				// the default not tested
				style_hp.value += `
					justify-content: flex-start;
					justify-items: flex-start;
				`
			}
			return 'display:flex;'
		},

		right: function(value, props, style_hp) {
			if (props.col) {
				style_hp.value += `
					align-content: flex-end;
					align-items: flex-end;
				`
			} else {
				style_hp.value += `
					justify-content: flex-end;
					justify-items: flex-end;
				`
			}
			return 'display:flex;'
		},

		top: function(value, props, style_hp) {
			if (props.col) {
				// the default not tested
				style_hp.value += `
					justify-content: flex-start;
					justify-items: flex-start;
				`
			} else {
				// the default not tested
				style_hp.value += `
					align-content: flex-start;
					align-items: flex-start;
				`
			}
			return 'display:flex;'
		},

		bottom: function(value, props, style_hp) {
			if (props.col) {
				style_hp.value += `
					justify-content: flex-end;
					justify-items: flex-end;
				`
			} else {
				style_hp.value += `
					align-content: flex-end;
					align-items: flex-end;
				`
			}
			return 'display:flex;'
		},

		horizontal: function(value, props, style_hp) {
			if (props.col) {
				style_hp.value += `
					align-content: center;
					align-items: center;
				`
			} else {
				style_hp.value += `
					justify-content: center;
					justify-items: center;
				`
			}
			return 'display:flex;'
		},
		vertical: function(value, props, style_hp) {
			if (props.col) {
				style_hp.value += `
					justify-content: center;
					justify-items: center;
				`
			} else {
				style_hp.value += `
					align-content: center;
					align-items: center;
				`
			}
			return 'display:flex;'
		},
		center: function(value, props, style_hp) {
			style_hp.value += `
				justify-content: center;
				align-content: center;
				justify-items: center;
				align-items: center;
			`
			return 'display:flex;'
		},
		'space-around': function(value, props, style_hp) {
			style_hp.value += `
				justify-content: space-around;
				align-content: space-around;
				justify-items: center;
				align-items: center;
			`
			return 'display:flex;'
		},
		'space-between': function(value, props, style_hp) {
			style_hp.value += `
				justify-content: space-between;
				align-content: space-between;
				justify-items: center;
				align-items: center;
			`
			return 'display:flex;'
		},
		'space-evenly': function(value, props, style_hp) {
			style_hp.value += `
				justify-content: space-evenly;
				align-content: space-evenly;
				justify-items: center;
				align-items: center;
			`
			return 'display:flex;'
		},
		stretch: function(value, props, style_hp) {
			style_hp.value += `
				justify-content: stretch;
				align-content: stretch;
				justify-items: center;
				align-items: center;
			`
			return 'display:flex;'
		},
	}

	// separates the properties in groups for better caching
	pre_style_categories() {
		return {
			font: { exp: /font|text|white-space|line/, buffer: '' },
			padding_margin_border: {
				exp: /padding|margin|border|box-shadow/,
				buffer: '',
			},
			size: { exp: /width|height|basis/, buffer: '' },
			color: { exp: /color|rgb|#/, buffer: '' },
			//layer: { exp: /animation|transform|opacity/, buffer: '' },
			//display: { exp: /display|flex|position|top:|right:|bottom:|left:/, buffer: '' },
			unknown: { buffer: '' },
		}
	}

	// creates the mobile styles from properties
	post_style_categories() {
		return {
			unknown: { buffer: '' },
			'@small': {
				exp: /@small/,
				pre: '@media (max-width:1366px){', // screens that are 1366px or less
				buffer: '',
				post: '}\n',
				replace: /@small\s+/g,
				replacement: '',
			},
			'@tablet': {
				exp: /@tablet/,
				pre: '@media (max-width:1030px){', // screens that are 1030px or less
				buffer: '',
				post: '}\n',
				replace: /@tablet\s+/g,
				replacement: '',
			},
			'@phone': {
				exp: /@phone/,
				pre: '@media (max-width:768px){', // screens that are 768px or less
				buffer: '',
				post: '}\n',
				replace: /@phone\s+/g,
				replacement: '',
			},
		}
	}

	constructor() {
		// TODO memoize
		this.sheet_process = this.sheet_process.bind(this)
		this.normalize_styles = this.normalize_styles.bind(this)
		this.normalize_styles_properties = this.normalize_styles_properties.bind(
			this
		)
		this.normalize_properties = this.normalize_properties.bind(this)
		this.pre_style = this.process_styles.bind(this, this.pre_style_categories)
		this.post_style = this.process_styles.bind(this, this.post_style_categories)

		this.validate_css = this.validate_css.bind(this)
		this.css = this.css.bind(this)
		this.factory = this.factory.bind(this)
		this.classNames = this.classNames.bind(this)
		this.hash_classes = this.hash_classes.bind(this)
		this.hash_properties = this.hash_properties.bind(this)

		// normalize default properties
		for (var id in this.css_property) {
			this.css_property[id] = this.normalize_properties(this.css_property[id])
		}

		// if you use template literals in css_property_value
		// then the editor adds a ; when it gets formatted on save
		for (var id in this.css_property_value) {
			this.css_property_value[id] = this.css_property_value[id].replace(
				/;\s*$/,
				''
			)
		}
		// normalize default classes
		for (var id in this.sheet_queue) {
			this.sheet_queue[id] = this.normalize_styles(this.sheet_queue[id])
		}
	}

	// returns a component with html tag "element" and given "styles" assigned as the className(s) for that element
	css(styles, element) {
		if (styles && styles.raw) {
			styles = styles.raw[0]
		} else if (typeof styles !== 'string') {
			element = styles || this.element
			styles = ''
		}
		element = element || this.element
		/*
		if (typeof element == 'function') {

			warn(
				'Style: consider wrapping the function/class as React.memo(f)',
				element
			)
		}
		*/

		return this.factory(element, this.classNames(styles))
	}

	factory(element, classNames) {
		return function(style, element, classNames, props) {
			return React.createElement(element, style.props(props, classNames))
		}.bind(null, this, element, classNames)
	}

	// from any style transforms that to classNames
	classNames(styles, classNames) {
		classNames = classNames ? ' ' + classNames : ''

		styles = this.normalize_styles(styles)
		styles = this.pre_style(styles)
		classNames = this.hash_classes(styles, classNames)

		return classNames.trim()
	}

	hash_classes(styles, classNames) {
		//tick('hash_classes')

		styles = styles.split('}')
		for (var css in styles) {
			css = (styles[css] + '}').replace(/^\s+/, '')
			if (css != '}') {
				classNames += ' ' + this.hash_properties(css)
			}
		}
		//tick('hash_classes')

		return classNames
	}
	hash_properties(styles) {
		//tick('hash_properties')

		var className = this.properties_id(styles)
		if (styles.indexOf('class') != -1) {
			styles = styles.replace(/class/g, '.' + className)
		} else {
			className = ''
		}
		this.validate_css(styles)
		this.sheet_queue.push(styles)
		this.task(this.sheet_process)
		//tick('hash_properties')

		return className
	}

	// from any react props (row col align etc) transforms that to classNames
	// return props without our attributes
	// returns same props if nothing been modified
	props(_props, classNames) {
		classNames = classNames || ''

		this.parent_counter++

		var styles = ''
		var attr_hp = { value: '' }
		var class_lp = ''
		var class_hp = ''

		const props = {}
		for (var id in _props) {
			if (this.debug) {
				if (id.indexOf('test') != -1) {
					id = props[id]
				}
			}

			if (id == 'children') {
				props[id] = _props[id]
			} else if (id in this.css_property) {
				styles += this.css_property[id]
				if (this.debug) {
					props['data-' + id] = _props[id]
				}
			} else if (id in this.css_property_value) {
				if (_props[id] != '') {
					styles +=
						this.css_property_value[id].replace(/;\s*$/, '') + _props[id] + ';'
					if (this.debug) {
						props['data-' + id] = _props[id]
					}
				}
			} else if (id in this.css_property_fn) {
				styles += this.css_property_fn[id](_props[id], _props, attr_hp)
				if (this.debug) {
					props['data-' + id] = _props[id]
				}
			} else if (id == 'style') {
				class_hp += this.classNames(this.prop_react_styles(_props[id])) + ' '
			} else if (id == 'css') {
				class_lp += this.classNames(_props[id]) + ' '
			} else if (id == 'css_parent') {
				this.append_to_parent(_props[id])
			} else {
				props[id] = _props[id]
			}
		}

		if (this.appended_to_parent) {
			this.appended_to_parent = false
			classNames += 'ch' + this.parent_counter + ' '
		}

		classNames = (classNames + ' ' + class_lp + class_hp).trim()

		styles = (styles + attr_hp.value).trim()

		if (styles == '' && !classNames) {
			return _props // using same props
		}

		props.className = this.classNames(
			styles,
			props.className ? classNames + ' ' + props.className : classNames
		)

		return props
	}

	prop_react_styles(style) {
		var styles = ''
		for (var id in style) {
			styles += this.prop_hyphenate_style_name(id) + ':' + style[id] + ';'
		}
		return styles
	}
	prop_hyphenate_style_name_uppercase_pattern = /([A-Z])/g
	prop_hyphenate_style_name(name) {
		return name
			.replace(this.prop_hyphenate_style_name_uppercase_pattern, '-$1')
			.toLowerCase()
	}
	process_styles(_categories, _styles) {
		//tick('process_styles')

		var header
		var categories = _categories()

		var styles = ''
		var properties = _styles.split('\n')
		var property, found, id, category

		for (id in properties) {
			property = properties[id]
			if (property.indexOf('{') !== -1) {
				header = property
			} else if (property.indexOf('}') !== -1) {
				for (id in categories) {
					if (categories[id].buffer != '') {
						category = categories[id]
						styles +=
							(category.pre || '') +
							header +
							'\n' +
							(!category.replace
								? category.buffer
								: category.buffer.replace(
										category.replace,
										category.replacement
								  )) +
							'}\n' +
							(category.post || '')
					}
				}
				categories = _categories()
			} else if (!property) {
				continue
			} else {
				found = false
				for (id in categories) {
					category = categories[id]
					if (category.exp && category.exp.test(property)) {
						category.buffer += property + '\n'
						found = true
						break
					}
				}
				if (!found) categories.unknown.buffer += property + '\n'
			}
		}
		//tick('process_styles')

		return styles.trim()
	}

	normalize_styles(styles) {
		//tick('normalize_styles')

		styles = (styles.indexOf('{') === -1 ? 'class{' + styles + '}' : styles) // class { style }
			.replace(/\/\*[^*]+\*\//g, '') // remove comments: /* comment */
			.replace(/\/\/[^\n]+/g, '') // remove comments //
			.replace(/\s+/g, ' ') // deduplicate spaces

			.replace(/{([^}]+)}/g, this.normalize_styles_properties)
			.replace(/}\s+/g, '}') // deduplicate spaces
			.replace(/\s+{/g, '{') // deduplicate spaces
			.replace(/{/g, '{\n') // { header
			.replace(/;/g, ';\n') // property
			.replace(/}/g, '}\n') // footer
			.trim()
		//tick('normalize_styles')

		return styles
	}
	normalize_styles_properties(_, properties) {
		//tick('normalize_styles_properties')
		properties = properties.trim().split(';')
		for (var id in properties) {
			if (this.css_property[properties[id]]) {
				properties[id] = this.css_property[properties[id]]
			}
		}
		properties = properties.join(';').split(';')
		properties =
			'{' +
			this.unique(properties)
				.join('\n')
				.trim()
				.replace(/\n/g, ';') +
			';}'
		//tick('normalize_styles_properties')
		return properties
	}
	normalize_properties(properties) {
		//tick('normalize_css')
		properties = properties
			.replace(/\/\*[^*]+\*\//g, '') // remove comments: /* comment */
			.replace(/\/\/[^\n]+/g, '') // remove comments //
			.replace(/\s+/g, ' ') // deduplicate spaces

			.trim()

		//tick('normalize_css')
		return properties
	}

	append_to_parent(styles) {
		var id = this.properties_id(styles)
		var className = 'p' + id
		this.classNames('.' + className + '{' + styles + '}')
		this.parent.push({
			children: '.ch' + this.parent_counter,
			className: className,
		})
		this.appended_to_parent = true
		this.task(this.sheet_process)
	}

	sheet_process() {
		if (this.sheet_queue.length) {
			////tick('sheet_process')
			if (!this.sheet_append) {
				this.sheet_append = document.createElement('style')
				this.sheet_append.appendChild(document.createTextNode(''))
				document.head.appendChild(this.sheet_append)

				this.sheet_insert = document.createElement('style')
				this.sheet_insert.appendChild(document.createTextNode(''))
				document.head.appendChild(this.sheet_insert)

				if (this.sheet_insert.sheet.insertRule)
					this.insertRule = this.sheet_insert.sheet.insertRule.bind(
						this.sheet_insert.sheet
					)
			}
			var styles = this.sheet_queue.join('\n')
			this.sheet_queue.length = 0
			if (styles.indexOf('@') != -1) {
				styles = this.post_style(styles)
			}
			if (!this.debug && this.insertRule) {
				try {
					this.insertRule('@media{' + styles + '}', this.sheet_rules++)
				} catch (e) {
					this.sheet_append.appendChild(document.createTextNode(styles))
					error(e)
				}
			} else {
				this.sheet_append.appendChild(document.createTextNode(styles))
			}
			////tick('sheet_process')
		}

		if (this.parent.length) {
			var parent_new = []
			for (var parent of this.parent) {
				var elements = $$(parent.children)
				for (var element of elements) {
					if (element) {
						element.parentNode.classList.add(parent.className)
						parent_new.push(parent)
					} else {
						console.log('element does not exists', element)
					}
				}
			}
			this.parent = parent_new
		}
	}

	validate_css(css) {
		/*if (/animation/.test(css) && !/position:/.test(css)) {
			error('Style: animations should have a position')
		}
		if (/animation/.test(css) && !/will-change/.test(css)) {
			error(
				'Style: animations should have will-change for the animated properties'
			)
		}

		if (/width|height/.test(css)) {
			if (!/box-sizing/.test(css) && /margin|border|padding/.test(css)) {
				error(
					'Style: width|height with margin|border|padding declared without declaring a box-sizing'
				)
			}
		}*/
	}
	properties_id(properties) {
		return (
			'c' + // class names should start with a letter! or these will not work.
			(!this.debug && this.properties[properties]
				? this.properties[properties]
				: (this.properties[properties] = ++this.properties_counter))
		)
	}
	// helpers
	unique(b) {
		var a = []
		for (var i = 0, l = b.length; i < l; i++) {
			if (a.indexOf(b[i]) === -1) a.push(b[i])
		}
		return a
	}

	task(fn) {
		Promise.resolve().then(fn)
	}
}

const style = new Style()
const css = style.css
const Box = function(style, props) {
	return React.createElement(props.element || style.element, style.props(props))
}.bind(null, style)
