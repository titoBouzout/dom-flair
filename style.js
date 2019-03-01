class Style {
	debug = false

	element = 'div'

	parent = []
	parent_counter = 0

	classes = {}

	properties = {}
	properties_counter = 0

	sheet_rules = [0, 0, 0, 0, 0, 0]
	sheet_queue = [[], [], [], [], [], []]

	// static values
	define_attribute(name, string) {
		this.css_property[name] = string
		this.index_attributes()
	}
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

			flex-grow: 1;
			flex-shrink: 1;
			flex-basis: 0%;

			align-self: stretch;
			min-height: 0;
			min-width: 0;

			align-content: flex-start;
			justify-content: flex-start;
			justify-items: flex-start;
			align-items: flex-start;
		`,
		// box-sizing maybe messing with wrap
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

		'border-box': 'box-sizing:border-box;',
		'content-box': 'box-sizing:content-box;',

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

		// ALIGNMENT regular priority values

		left: 'display:flex;',
		right: 'display:flex;',
		top: 'display:flex;',
		bottom: 'display:flex;',
		horizontal: 'display:flex;',
		vertical: 'display:flex;',
		center: 'display:flex;',
		'space-around': 'display:flex;',
		'space-around-horizontal': 'display:flex;',
		'space-around-vertical': 'display:flex;',
		'space-between': 'display:flex;',
		'space-between-horizontal': 'display:flex;',
		'space-between-vertical': 'display:flex;',
		'space-evenly': 'display:flex;',
		'space-evenly-horizontal': 'display:flex;',
		'space-evenly-vertical': 'display:flex;',
		stretch: 'display:flex;',
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

		z: 'z-index:',

		align: 'text-align:',

		size: 'font-size:',

		basis: 'flex-basis:',
	}
	// static values high priority
	define_attribute_high_priority(name, string) {
		this.css_property_high_priority[name] = string
		this.index_attributes()
	}
	css_property_high_priority = {}

	// dynamic values
	define_dynamic_attribute(name, fn) {
		this.css_property_fn[name] = fn
		this.index_attributes()
	}
	css_property_fn = {
		// width
		width: function(value, props) {
			return 'width:' + (value !== true ? value : '100%') + ';'
		},
		w: function(value, props) {
			return 'width:' + (value !== true ? value : '100%') + ';'
		},
		'max-w': function(value, props) {
			return 'max-width:' + (value !== true ? value : '100%') + ';'
		},
		'min-w': function(value, props) {
			return 'min-width:' + (value !== true ? value : '100%') + ';'
		},

		// height
		height: function(value, props) {
			return 'height:' + (value !== true ? value : '100%') + ';'
		},
		h: function(value, props) {
			return 'height:' + (value !== true ? value : '100%') + ';'
		},
		'max-h': function(value, props) {
			return 'max-height:' + (value !== true ? value : '100%') + ';'
		},
		'min-h': function(value, props) {
			return 'min-height:' + (value !== true ? value : '100%') + ';'
		},

		radius: function(value, props) {
			return 'border-radius:' + (value !== true ? value : '100%') + ';'
		},
	}

	// dynamic values high priority
	define_dynamic_attribute_high_priority(name, fn) {
		this.css_property_fn_high_priority[name] = fn
		this.index_attributes()
	}
	css_property_fn_high_priority = {
		// main axis
		// justify-content space between items
		// justify-items for the default justify-self
		// justify-self alignment

		// cross axis
		// align-content space between items
		// align-items for the default align-self
		// align-self alignment

		left: function(value, props) {
			if (props.col) {
				// the default not tested
				return `
					align-content: flex-start;
					align-items: flex-start;
				`
			} else {
				// the default not tested
				return `
					justify-content: flex-start;
					justify-items: flex-start;
				`
			}
		},

		right: function(value, props) {
			if (props.col) {
				return `
					align-content: flex-end;
					align-items: flex-end;
				`
			} else {
				return `
					justify-content: flex-end;
					justify-items: flex-end;
				`
			}
		},

		top: function(value, props) {
			if (props.col) {
				// the default not tested
				return `
					justify-content: flex-start;
					justify-items: flex-start;
				`
			} else {
				// the default not tested
				return `
					align-content: flex-start;
					align-items: flex-start;
				`
			}
		},

		bottom: function(value, props) {
			if (props.col) {
				return `
					justify-content: flex-end;
					justify-items: flex-end;
				`
			} else {
				return `
					align-content: flex-end;
					align-items: flex-end;
				`
			}
		},

		horizontal: function(value, props) {
			if (props.col) {
				return `
					align-content: center;
					align-items: center;
				`
			} else {
				return `
					justify-content: center;
					justify-items: center;
				`
			}
		},
		vertical: function(value, props) {
			if (props.col) {
				return `
					justify-content: center;
					justify-items: center;
				`
			} else {
				return `
					align-content: center;
					align-items: center;
				`
			}
		},
		center: function(value, props) {
			return `
				justify-content: center;
				align-content: center;
				justify-items: center;
				align-items: center;
			`
		},
		'space-around': function(value, props) {
			return `
				justify-content: space-around;
				align-content: space-around;
				justify-items: center;
				align-items: center;
			`
		},
		'space-around-horizontal': function(value, props) {
			if (props.col) {
				// TODO
				return `
					justify-content: space-around;
					align-content: space-around;
					justify-items: center;
					align-items: center;
				`
			} else {
				return `
					justify-content: space-around;
				`
			}
		},
		'space-around-vertical': function(value, props) {
			if (props.col) {
				// TODO
				return `
					justify-content: space-around;
					align-content: space-around;
					justify-items: center;
					align-items: center;
				`
			} else {
				return `
					align-content: space-around;
				`
			}
		},
		'space-between': function(value, props) {
			return `
				justify-content: space-between;
				align-content: space-between;
				justify-items: center;
				align-items: center;
			`
		},
		'space-between-horizontal': function(value, props) {
			if (props.col) {
				// TODO
				return `
					justify-content: space-between;
					align-content: space-between;
					justify-items: center;
					align-items: center;
				`
			} else {
				return `
					justify-content: space-between;
				`
			}
		},
		'space-between-vertical': function(value, props) {
			if (props.col) {
				// TODO
				return `
					justify-content: space-between;
					align-content: space-between;
					justify-items: center;
					align-items: center;
				`
			} else {
				return `
					align-content: space-between;
				`
			}
		},
		'space-evenly': function(value, props) {
			return `
				justify-content: space-evenly;
				align-content: space-evenly;
				justify-items: center;
				align-items: center;
			`
		},
		'space-evenly-horizontal': function(value, props) {
			if (props.col) {
				// TODO
				return `
					justify-content: space-evenly;
					align-content: space-evenly;
					justify-items: center;
					align-items: center;
				`
			} else {
				return `
					justify-content: space-evenly;
				`
			}
		},
		'space-evenly-vertical': function(value, props) {
			if (props.col) {
				// TODO
				return `
					justify-content: space-evenly;
					align-content: space-evenly;
					justify-items: center;
					align-items: center;
				`
			} else {
				return `
					align-content: space-evenly;
				`
			}
		},
		stretch: function(value, props) {
			return `
				justify-content: stretch;
				align-content: stretch;
				justify-items: center;
				align-items: center;
			`
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
		// memoize setup
		this.serialize = this.serialize.bind(this)
		this._serialize = this._serialize.bind(this)
		this.is_primitive = this.is_primitive.bind(this)
		// memoize cache has a resolution of 20 seconds
		this.now = Date.now()
		setInterval(function() {
			this.now = Date.now()
		}, 20000)

		// bind
		this.sheet_process = this.sheet_process.bind(this)
		this.normalize_styles = this.normalize_styles.bind(this)
		this.normalize_styles_properties = this.normalize_styles_properties.bind(
			this
		)
		this.normalize_properties = this.normalize_properties.bind(this)
		this.pre_style = this.process_styles.bind(this, this.pre_style_categories)
		this.post_style = this.process_styles.bind(this, this.post_style_categories)

		this.validate_clases = this.validate_clases.bind(this)
		this.css = this.css.bind(this)
		this.factory = this.factory.bind(this)
		this.classNames = this.classNames.bind(this)
		this.hash_classes = this.hash_classes.bind(this)
		this.hash_properties = this.hash_properties.bind(this)

		// memoizing
		// TODO resolve an expiration for the chache
		this.normalize_styles = this.memo(this.normalize_styles)
		this.normalize_styles_properties = this.memo(
			this.normalize_styles_properties
		)
		this.normalize_properties = this.memo(this.normalize_properties)
		this.pre_style = this.memo(
			this.process_styles.bind(style, this.pre_style_categories)
		)
		this.post_style = this.memo(
			this.process_styles.bind(style, this.post_style_categories)
		)

		this.validate_css = this.memo(this.validate_css)

		if (!this.debug) {
			this.css = this.memo(this.css)
			this.factory = this.memo(this.factory)
			this.classNames = this.memo(this.classNames)
			this.hash_classes = this.memo(this.hash_classes)
			this.hash_properties = this.memo(this.hash_properties)
		}

		this.index_attributes()

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

		// init sheets
		this.sheet_append = []
		this.sheet_insert = []
		this.insert_rule = []
		for (var id = 0; id < 6; id++) {
			this.sheet_append[id] = document.createElement('style')
			this.sheet_append[id].appendChild(document.createTextNode(''))
			document.head.appendChild(this.sheet_append[id])

			this.sheet_insert[id] = document.createElement('style')
			this.sheet_insert[id].appendChild(document.createTextNode(''))
			document.head.appendChild(this.sheet_insert[id])

			if (this.sheet_insert[id].sheet.insertRule)
				this.insert_rule[id] = this.sheet_insert[id].sheet.insertRule.bind(
					this.sheet_insert[id].sheet
				)
		}

		this.to_fast_properties = (function() {
			let fastProto = null

			// Creates an object with permanently fast properties in V8. See Toon Verwaest's
			// post https://medium.com/@tverwaes/setting-up-prototypes-in-v8-ec9c9491dfe2#5f62
			// for more details. Use %HasFastProperties(object) and the Node.js flag
			// --allow-natives-syntax to check whether an object has fast properties.
			function FastObject(o) {
				// A prototype object will have "fast properties" enabled once it is checked
				// against the inline property cache of a function, e.g. fastProto.property:
				// https://github.com/v8/v8/blob/6.0.122/test/mjsunit/fast-prototype.js#L48-L63
				if (fastProto !== null && typeof fastProto.property) {
					const result = fastProto
					fastProto = FastObject.prototype = null
					return result
				}
				fastProto = FastObject.prototype = o == null ? Object.create(null) : o
				return new FastObject()
			}

			// Initialize the inline property cache of FastObject
			FastObject()

			return function toFastproperties(o) {
				return FastObject(o)
			}
		})()
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

		return this.factory(element, this.classNames(styles, 0))
	}

	factory(element, classNames) {
		return function(style, element, classNames, props) {
			return React.createElement(
				props.element || element,
				style.props(props, classNames)
			)
		}.bind(null, this, element, classNames)
	}

	// from any style transforms that to classNames
	classNames(styles, priority) {
		styles = this.normalize_styles(styles)
		styles = this.pre_style(styles)

		return this.hash_classes(styles, priority)
	}

	hash_classes(styles, priority) {
		//tick('hash_classes')
		var classNames = ''
		styles = styles.split('}')
		for (var css in styles) {
			css = (styles[css] + '}').replace(/^\s+/, '')
			if (css != '}') {
				classNames += this.hash_properties(css, priority) + ' '
			}
		}
		//tick('hash_classes')

		return classNames
	}
	hash_properties(styles, priority) {
		//tick('hash_properties')

		var className = this.properties_id(styles)
		if (styles.indexOf('class') != -1) {
			styles = styles.replace(/class/g, '.' + className)
		} else {
			className = ''
		}
		this.classes[className] = styles

		this.sheet_queue[priority].push(styles)
		this.queue_process()
		//tick('hash_properties')

		return className
	}

	// from any react props (row col align etc) transforms that to classNames
	// return props without our attributes
	// returns same props if nothing been modified
	props(_props, classNames) {
		const values = {
			classNames: classNames ? classNames + ' ' : '',
			styles: '',
		}

		this.parent_counter++

		const props = {}
		for (var id in _props) {
			if (this.attributes[id]) {
				for (var i in this.attributes[id]) {
					this.attributes[id][i](_props[id], _props, values)
				}
				if (this.debug) {
					props['data-' + id] = this.is_primitive(_props[id])
						? _props[id]
						: this.serialize(_props[id])
				}
			} else {
				props[id] = _props[id]
			}
		}
		if (values.styles != '') {
			values.classNames += this.classNames(values.styles, 1) + ' '
		}

		if (this.appended_to_parent) {
			this.appended_to_parent = false
			values.classNames += 'ch' + this.parent_counter + ' '
		}

		if (!values.classNames) {
			return _props // using same props
		}

		props.className = (props.className
			? props.className + ' ' + values.classNames
			: values.classNames
		).trim()

		if (this.debug && props.className != '' && _props.novalidate === undefined)
			this.validate_clases(props.className)

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

		styles = (styles.indexOf('{') === -1 ? 'class{\n' + styles + '\n}' : styles) // class { style }
			.replace(/\/\*[^*]+\*\//g, '') // remove comments: /* comment */
			.replace(/\/\/[^\n]+/g, '') // remove comments //
			.replace(/\s+/g, ' ') // deduplicate spaces
			.replace(/\s*;\s*/g, ';') // deduplicate spaces
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
		this.classNames('.' + className + '{' + styles + '}', 5)
		this.parent.push({
			children: '.ch' + this.parent_counter,
			className: className,
		})
		this.appended_to_parent = true
		this.queue_process()
	}

	sheet_process() {
		this.queue_process_added = false
		////tick('sheet_process')

		for (var id = 0; id < 6; id++) {
			if (this.sheet_queue[id].length) {
				var styles = this.sheet_queue[id].join('\n')
				this.sheet_queue[id].length = 0
				if (styles.indexOf('@') != -1) {
					styles = this.post_style(styles)
				}
				if (!this.debug && this.insert_rule[id]) {
					try {
						this.insert_rule[id](
							'@media{' + styles + '}',
							this.sheet_rules[id]++
						)
					} catch (e) {
						this.sheet_append[id].appendChild(document.createTextNode(styles))
						;(error || console.error)(e)
					}
				} else {
					this.sheet_append[id].appendChild(document.createTextNode(styles))
				}
			}
		}
		////tick('sheet_process')

		////tick('sheet_process parent')
		if (this.parent.length) {
			var parent_new = []
			for (var parent of this.parent) {
				var elements = document.querySelectorAll(parent.children)
				for (var element of elements) {
					if (element) {
						element.parentNode.classList.add(parent.className)
						parent_new.push(parent)
					} else {
						;(error || console.error)('element does not exists', element)
					}
				}
			}
			this.parent = parent_new
		}
		////tick('sheet_process parent')
	}

	validate_clases(classNames) {
		var styles = classNames + '\n\n'
		for (var className of classNames.split(' ')) {
			if (this.classes[className]) {
				styles += this.classes[className] + '\n'
			}
		}

		// validate box-sizing
		/*styles = styles.replace(/min-height: 0;/g, '').replace(/min-width: 0;/g, '')
		if (/width|height/.test(styles)) {
			if (!/box-sizing/.test(styles) && /margin|border|padding/.test(styles)) {
				error(
					'Style: width|height with margin|border|padding declared without declaring a box-sizing'
				)
				;(log || console.log)(styles)
			}
		}*/

		/*if (/animation/.test(css) && !/position:/.test(css)) {
			error('Style: animations should have a position')
		}
		if (/animation/.test(css) && !/will-change/.test(css)) {
			error(
				'Style: animations should have will-change for the animated properties'
			)
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
	index_attributes() {
		this.attributes = {
			style: [
				function(attribute_value, _props, values) {
					if (typeof attribute_value == 'string') {
						values.classNames += this.classNames(attribute_value, 3) + ' '
					} else {
						values.classNames +=
							this.classNames(this.prop_react_styles(attribute_value), 3) + ' '
					}
				}.bind(this),
			],
			css: [
				function(attribute_value, _props, values) {
					values.classNames += this.classNames(attribute_value, 2) + ' '
				}.bind(this),
			],
			css_parent: [
				function(attribute_value, _props, values) {
					this.append_to_parent(attribute_value)
				}.bind(this),
			],
			novalidate: [function() {}],
		}

		for (var id in this.css_property) {
			if (!this.attributes[id]) this.attributes[id] = []
			this.attributes[id].push(
				function(id, attribute_value, _props, values) {
					values.styles += this.css_property[id]
				}.bind(this, id)
			)
		}
		for (var id in this.css_property_high_priority) {
			if (!this.attributes[id]) this.attributes[id] = []
			this.attributes[id].push(
				function(id, attribute_value, _props, values) {
					values.styles += this.css_property_high_priority[id]
				}.bind(this, id)
			)
		}
		for (var id in this.css_property_value) {
			if (!this.attributes[id]) this.attributes[id] = []
			this.attributes[id].push(
				function(id, attribute_value, _props, values) {
					if (attribute_value != '') {
						values.styles += this.css_property_value[id] + attribute_value + ';'
					}
				}.bind(this, id)
			)
		}
		for (var id in this.css_property_fn) {
			if (!this.attributes[id]) this.attributes[id] = []
			this.attributes[id].push(
				function(id, attribute_value, _props, values) {
					values.styles += this.css_property_fn[id](attribute_value, _props)
				}.bind(this, id)
			)
		}
		for (var id in this.css_property_fn_high_priority) {
			if (!this.attributes[id]) this.attributes[id] = []
			this.attributes[id].push(
				function(id, attribute_value, _props, values) {
					values.classNames +=
						this.classNames(
							this.css_property_fn_high_priority[id](attribute_value, _props),
							4
						) + ' '
				}.bind(this, id)
			)
		}
	}
	queue_process() {
		if (!this.queue_process_added) {
			this.queue_process_added = true
			this.task(this.sheet_process)
		}
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
	// memoize functions
	serialize(o) {
		return JSON.stringify(o, this._serialize)
	}
	_serialize(k, v) {
		if (typeof v == 'function') {
			return v.name
		} else {
			return v
		}
	}
	is_primitive(o) {
		if (!o) return true

		switch (typeof o) {
			case 'string':
			case 'boolean':
			case 'number': {
				return true
			}
			default: {
				return false
			}
		}
	}
	memo(fn, expires) {
		if (!expires) {
			return function(fn, cache, serialize, is_primitive, ...args) {
				const k =
					args.length == 1 && is_primitive(args[0]) ? args[0] : serialize(args)

				return cache[k] !== undefined ? cache[k] : (cache[k] = fn(...args))
			}.bind(null, fn, {}, this.serialize, this.is_primitive)
		} else {
			const f = function(
				fn,
				cache,
				serialize,
				expires,
				setInterval,
				time,
				is_primitive,
				...args
			) {
				const k =
					args.length == 1 && is_primitive(args[0]) ? args[0] : serialize(args)

				if (cache[k] !== undefined) {
					cache[k].n = time.now
				} else {
					cache[k] = { v: fn(...args), n: time.now }
				}
				expires && !this.timeout && setInterval()
				return cache[k].v
			}

			f.cache = {}
			f.expires = expires
			f.setInterval = function() {
				this.timeout = setInterval(this.expire, this.expires)
			}.bind(f)
			f.clearInterval = function() {
				clearInterval(this.timeout)
				this.timeout = false
			}.bind(f)
			f.expire = function(expires, clearInterval, time, to_fast_properties) {
				const n = time.now
				var empty = true
				for (var k in this) {
					if (this[k] !== undefined) {
						if (n - this[k].n > expires) {
							this[k] = undefined
						} else {
							empty = false
						}
					}
				}
				if (empty) {
					clearInterval()
				} else {
					to_fast_properties(this)
				}
			}.bind(f.cache, f.expires, f.clearInterval, this, this.to_fast_properties)

			return f.bind(
				f,
				fn,
				f.cache,
				this.serialize,
				f.expires,
				f.setInterval,
				this,
				this.is_primitive
			)
		}
	}
}

const style = new Style()
const css = style.css
const Box = function(style, props) {
	return React.createElement(props.element || style.element, style.props(props))
}.bind(null, style)
