function Style() {
	// bind

	this.serialize = this.serialize.bind(this)
	this._serialize = this._serialize.bind(this)
	this.is_primitive = this.is_primitive.bind(this)

	this.classNames = this.classNames.bind(this)
	this.hash_classes = this.hash_classes.bind(this)
	this.hash_properties = this.hash_properties.bind(this)
	this.prop_react_styles = this.prop_react_styles.bind(this)
	this.process_styles = this.process_styles.bind(this)
	this.normalize_styles = this.normalize_styles.bind(this)
	this.normalize_styles_properties = this.normalize_styles_properties.bind(this)
	this.normalize_properties = this.normalize_properties.bind(this)

	this.sheet_process = this.sheet_process.bind(this)
	this.validate_clases = this.validate_clases.bind(this)
	this.css = this.css.bind(this)

	// memoize/cache

	this.classNames = this.memo(this.classNames)
	this.hash_classes = this.memo(this.hash_classes)
	this.hash_properties = this.memo(this.hash_properties)
	this.prop_react_styles = this.memo(this.prop_react_styles)
	this.process_styles = this.memo(this.process_styles)
	this.normalize_styles = this.memo(this.normalize_styles)
	this.normalize_styles_properties = this.memo(this.normalize_styles_properties)
	this.normalize_properties = this.memo(this.normalize_properties)
	this.validate_clases = this.memo(this.validate_clases)

	// The following functions cannot be memoize
	// this.css = this.memo(this.css)
	// this.factory = this.memo(this.factory)

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

	this.index_attributes()

	// normalize default properties
	for (var id in this.css_property) {
		this.css_property[id] = this.normalize_properties(this.css_property[id])
	}

	// if you use template literals in css_property_value
	// then the editor may adds a ; when it gets formatted on save
	for (var id in this.css_property_value) {
		this.css_property_value[id] = this.css_property_value[id].replace(/;\s*$/, '')
	}

	if (!React.memo) {
		React.memo = function(a) {
			return a
		}
	}
	this.Box = React.memo(
		function(React, style, props) {
			return React.createElement(props.element || style.element, style.props(props))
		}.bind(null, React, this),
	)
}

Style.prototype.debug = location.href.indexOf('localhost') != -1

Style.prototype.element = 'div'

Style.prototype.parent = []
Style.prototype.parent_counter = 0

Style.prototype.classes = {}

Style.prototype.properties = {}
Style.prototype.properties_counter = 0

Style.prototype.sheet_append = []
Style.prototype.sheet_insert = []
Style.prototype.sheet_insert_rule = []
Style.prototype.sheet_rules = [0, 0, 0, 0, 0, 0]
Style.prototype.sheet_queue = [[], [], [], [], [], []]

Style.prototype.warned = {}

// static values
Style.prototype.define_attribute = function(name, string) {
	this.css_property[name] = string
	this.index_attributes()
}
Style.prototype.css_property = {
	// LAYOUT

	row: `
		display: flex;
		flex-direction: row;
		//min-height: 0;
		//min-width: 0;

		align-content: flex-start;
		justify-content: flex-start;
		justify-items: flex-start;
		align-items: flex-start;
	`,
	col: `
		display: flex;
		flex-direction: column;
		//min-height: 0;
		//min-width: 0;

		align-content: flex-start;
		justify-content: flex-start;
		justify-items: flex-start;
		align-items: flex-start;
	`,
	column: `
		display: flex;
		flex-direction: column;
		//min-height: 0;
		//min-width: 0;

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
		//min-height: auto !important;
	`,
	// here maybe we should add min-height: 0 !important;
	'no-wrap': `
		flex-wrap: nowrap;
	`,

	// TEXT

	'text-multiline': 'line-height:1.4;',

	'text-crop': `
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		min-width: 0;
		min-height: 0;
	`,

	'text-no-wrap': `
		white-space: nowrap;
	`,

	'text-wrap': `
		word-break: break-word;
		overflow-wrap: anywhere;
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
	'inline-flex': 'display:inline-flex;',

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

	stretch: 'display:flex;',

	overflow: 'overflow:hidden;',
	layer: 'transform:translateZ(0);',
	collapse: 'visibility:collapse;',

	// CURSOR

	'cursor-hand': 'cursor:pointer;',
	'cursor-ignore': 'pointer-events:none;',

	// SELECTION

	'selection-none': '-moz-user-select: none;user-select:none;',

	// FONT

	'text-bold': 'font-weight:bold;',
	'text-capitalize': 'text-transform:capitalize;',
	'text-no-underline': 'text-decoration:none;',
	'text-regular': 'font-weight:normal;',
	'text-small': 'font-size:small;',
	'text-underline': 'text-decoration:underline;',
	'text-uppercase': 'text-transform:uppercase;',

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
}
Style.prototype.css_property_value = {
	padding: 'padding:',
	'padding-bottom': 'padding-bottom:',
	'padding-left': 'padding-left:',
	'padding-right': 'padding-right:',
	'padding-top': 'padding-top:',

	margin: 'margin:',
	'margin-bottom': 'margin-bottom:',
	'margin-left': 'margin-left:',
	'margin-right': 'margin-right:',
	'margin-top': 'margin-top:',

	border: 'border:',
	'border-bottom': 'border-bottom:',
	'border-left': 'border-left:',
	'border-right': 'border-right:',
	'border-top': 'border-top:',

	z: 'z-index:',

	'text-align': 'text-align:',

	'text-size': 'font-size:',
	'font-size': 'font-size:',

	// basis: 'flex-basis:',

	background: 'background:',
	'text-color': 'color:',

	'text-shadow': 'text-shadow:',
}
// static values high priority
Style.prototype.define_attribute_high_priority = function(name, string) {
	this.css_property_high_priority[name] = string
	this.index_attributes()
}
Style.prototype.css_property_high_priority = {}

// dynamic values
Style.prototype.define_dynamic_attribute = function(name, fn) {
	this.css_property_fn[name] = fn
	this.index_attributes()
}
Style.prototype.css_property_fn = {
	// width
	width: function(value, props) {
		if (value) return 'width:' + (value !== true ? value : '100%') + ';'
		else return ''
	},
	'max-width': function(value, props) {
		if (value) return 'max-width:' + (value !== true ? value : '100%') + ';'
		else return ''
	},
	'min-width': function(value, props) {
		if (value) return 'min-width:' + (value !== true ? value : '100%') + ';'
		else return ''
	},

	// height
	height: function(value, props) {
		if (value) return 'height:' + (value !== true ? value : '100%') + ';'
		else return ''
	},
	'max-height': function(value, props) {
		if (value) return 'max-height:' + (value !== true ? value : '100%') + ';'
		else return ''
	},
	'min-height': function(value, props) {
		if (value) return 'min-height:' + (value !== true ? value : '100%') + ';'
		else return ''
	},

	radius: function(value, props) {
		if (value) return 'border-radius:' + (value !== true ? value : '100%') + ';'
		else return ''
	},
	'drop-shadow': function(value, props) {
		if (value) return 'filter: drop-shadow(' + value + ');'
		else return ''
	},
}

// dynamic values high priority
Style.prototype.define_dynamic_attribute_high_priority = function(name, fn) {
	this.css_property_fn_high_priority[name] = fn
	this.index_attributes()
}
Style.prototype.css_property_fn_high_priority = {
	// main axis
	// justify-content space between items
	// justify-items for the default justify-self
	// justify-self alignment

	// cross axis
	// align-content space between items
	// align-items for the default align-self
	// align-self alignment

	left: function(value, props) {
		if (props.col || props.column) {
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
		if (props.col || props.column) {
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
		if (props.col || props.column) {
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
		if (props.col || props.column) {
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
		if (props.col || props.column) {
			return `
				align-content: center;
				align-items: center;
				// align-content: safe center;
				// align-items: safe center;
			`
		} else {
			return `
				justify-content: center;
				justify-items: center;
				// justify-content: safe center;
				// justify-items: safe center;
			`
		}
	},

	vertical: function(value, props) {
		if (props.col || props.column) {
			return `
				justify-content: center;
				justify-items: center;
				// justify-content: safe center;
				// justify-items: safe center;
			`
		} else {
			return `
				align-content: center;
				align-items: center;
				// align-content: safe center;
				// align-items: safe center;
			`
		}
	},

	center: function(value, props) {
		return `
			justify-content: center;
			align-content: center;
			justify-items: center;
			align-items: center;
			// justify-content: safe center;
			// align-content: safe center;
			// justify-items: safe center;
			// align-items: safe center;
		`
	},
	'space-around': function(value, props) {
		return `
			justify-content: space-around;
			align-content: initial; // this fix scroll when the item is bigger than the container, may need to be tested in colums and reverse it with justify-content

			justify-items: center;
			align-items: center;
			// justify-items: safe center;
			// align-items: safe center;
		`
	},
	'space-around-horizontal': function(value, props) {
		if (props.col || props.column) {
			// TODO
			return `
				justify-content: space-around;
				align-content: space-around;
				justify-items: center;
				align-items: center;
				// justify-items: safe center;
				// align-items: safe center;
			`
		} else {
			return `
				justify-content: space-around;
			`
		}
	},
	'space-around-vertical': function(value, props) {
		if (props.col || props.column) {
			// TODO
			return `
				justify-content: space-around;
				align-content: space-around;
				justify-items: center;
				align-items: center;
				// justify-items: safe center;
				// align-items: safe center;
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
			align-content: initial; // this fix scroll when the item is bigger than the container, may need to be tested in colums and reverse it with justify-content
			justify-items: center;
			align-items: center;
			// justify-items: safe center;
			// align-items: safe center;
		`
	},
	'space-between-horizontal': function(value, props) {
		if (props.col || props.column) {
			// TODO
			return `
				justify-content: space-between;
				align-content: space-between;
				justify-items: center;
				align-items: center;
				// justify-items: safe center;
				// align-items: safe center;
			`
		} else {
			return `
				justify-content: space-between;
			`
		}
	},
	'space-between-vertical': function(value, props) {
		if (props.col || props.column) {
			// TODO
			return `
				justify-content: space-between;
				align-content: space-between;
				justify-items: center;
				align-items: center;
				// justify-items: safe center;
				// align-items: safe center;
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
			align-content: initial; // this fix scroll when the item is bigger than the container, may need to be tested in colums and reverse it with justify-content
			justify-items: center;
			align-items: center;
			// justify-items: safe center;
			// align-items: safe center;
		`
	},
	'space-evenly-horizontal': function(value, props) {
		if (props.col || props.column) {
			// TODO
			return `
				justify-content: space-evenly;
				align-content: space-evenly;
				justify-items: center;
				align-items: center;
				// justify-items: safe center;
				// align-items: safe center;
			`
		} else {
			return `
				justify-content: space-evenly;
			`
		}
	},
	'space-evenly-vertical': function(value, props) {
		if (props.col || props.column) {
			// TODO
			return `
				justify-content: space-evenly;
				align-content: space-evenly;
				justify-items: center;
				align-items: center;
				// justify-items: safe center;
				// align-items: safe center;
			`
		} else {
			return `
				align-content: space-evenly;
			`
		}
	},
	/*stretch: function(value, props) {
		return `
			justify-content: stretch;
			align-content: stretch;
			justify-items: center;
			align-items: center;
			// justify-items: safe center;
			// align-items: safe center;
		`
	},*/

	// scroll

	'scroll-thin': function(value, props) {
		return `
			class::-webkit-scrollbar {
				width: 8px;
			}
			class {
				scrollbar-width: thin;
			}
		`
	},
	'scroll-color': function(value, props) {
		return `
			class::-webkit-scrollbar-track {
				background-color: ${props['scroll-background']};
			}

			class::-webkit-scrollbar-thumb {
				background-color: ${props['scroll-color']};
			}
			class {
				scrollbar-color: ${props['scroll-color']} ${props['scroll-background']};
			}
		`
	},
	'scroll-background': function(value, props) {
		return `
			class::-webkit-scrollbar-track {
				background-color: ${props['scroll-background']};
			}

			class::-webkit-scrollbar-thumb {
				background-color: ${props['scroll-color']};
			}
			class {
				scrollbar-color: ${props['scroll-color']} ${props['scroll-background']};
			}
		`
	},

	// selection
	'selection-color': function(value, props) {
		return `
			class::selection {
				color: ${value};
			}
		`
	},
	'selection-background': function(value, props) {
		return `
			class::selection {
				background-color: ${value};
			}
		`
	},
}
// separates the properties in groups for better caching
Style.prototype.pre_style_categories = function() {
	return {
		font: { exp: /font|text|white-space|line/, buffer: '' },
		padding_margin_border: {
			exp: /padding|margin|border|box-shadow/,
			buffer: '',
		},
		size: { exp: /width|height|basis/, buffer: '' },
		color: { exp: /color|rgb|#/, buffer: '' },
		//layer: { exp: /animation|transform|opacity/, buffer: '' },
		display: { exp: /display|position|top:|right:|bottom:|left:/, buffer: '' },
		flex: { exp: /flex|align|justify/, buffer: '' },
		unknown: { buffer: '' },
	}
}

// creates the mobile styles from properties
Style.prototype.post_style_categories = function() {
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
			pre: '@media (max-width:1023px){', // screens that are 1023px or less
			buffer: '',
			post: '}\n',
			replace: /@tablet\s+/g,
			replacement: '',
		},
		'@mobile': {
			exp: /@mobile/,
			pre: '@media (max-width:768px){', // screens that are 768px or less
			buffer: '',
			post: '}\n',
			replace: /@mobile\s+/g,
			replacement: '',
		},
	}
}

// returns a component with html tag "element" and given "styles" assigned as the className(s) for that element
Style.prototype.css = function(styles, ...element) {
	if (styles && styles.raw) {
		styles = styles.raw
		element = element[0] || this.element
	} else if (typeof styles !== 'string') {
		element = styles || this.element
		styles = ''
	} else {
		element = element[0] || this.element
	}
	/*
		if (typeof element == 'function') {
			warn('Style: consider wrapping the function/class as React.memo(f)',
				element)
		}
	*/

	return this.factory(element, this.classNames(styles, 0))
}

Style.prototype.factory = function(element, classNames) {
	return React.memo(
		function(React, style, element, classNames, props) {
			return React.createElement(props.element || element, style.props(props, classNames))
		}.bind(null, React, this, element, classNames),
	)
}

// from any style transforms that to classNames
Style.prototype.classNames = function(styles, priority) {
	styles = this.normalize_styles(styles)
	styles = this.process_styles(this.pre_style_categories, styles)

	return this.hash_classes(styles, priority)
}

Style.prototype.hash_classes = function(styles, priority) {
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
Style.prototype.hash_properties = function(styles, priority) {
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

// from any react props (row col align etc) returns just the className
Style.prototype.className = function(_props, classNames) {
	return this.props(_props, classNames).className
}

// from any react props (row col align etc) transforms that to classNames
// return props without our attributes
// returns same props if nothing been modified
Style.prototype.props = function(_props, classNames) {
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
				props['data-styled-' + id] = this.is_primitive(_props[id])
					? _props[id]
					: this.serialize(_props[id])
			}
		} else if (id == 'element') {
		} else if (id == 'reference') {
			props['ref'] = _props[id]
		} else {
			props[id] = _props[id]

			// TODO!
			if (this.debug) {
				switch (id) {
					// events
					case 'onAbort':
					case 'onAnimationEnd':
					case 'onAnimationIteration':
					case 'onAnimationStart':
					case 'onBlur':
					case 'onCanPlay':
					case 'onCanPlayThrough':
					case 'onChange':
					case 'onClick':
					case 'onCompositionEnd':
					case 'onCompositionStart':
					case 'onCompositionUpdate':
					case 'onContextMenu':
					case 'onCopy':
					case 'onCut':
					case 'onDoubleClick':
					case 'onDrag':
					case 'onDragEnd':
					case 'onDragEnter':
					case 'onDragExit':
					case 'onDragLeave':
					case 'onDragOver':
					case 'onDragStart':
					case 'onDrop':
					case 'onDurationChange':
					case 'onEmptied':
					case 'onEncrypted':
					case 'onEnded':
					case 'onError':
					case 'onFocus':
					case 'onGotPointerCapture':
					case 'onInput':
					case 'onInvalid':
					case 'onKeyDown':
					case 'onKeyPress':
					case 'onKeyUp':
					case 'onLoad':
					case 'onLoadedData':
					case 'onLoadedMetadata':
					case 'onLoadStart':
					case 'onLostPointerCapture':
					case 'onMouseDown':
					case 'onMouseEnter':
					case 'onMouseLeave':
					case 'onMouseMove':
					case 'onMouseOut':
					case 'onMouseOver':
					case 'onMouseUp':
					case 'onPaste':
					case 'onPause':
					case 'onPlay':
					case 'onPlaying':
					case 'onPointerCancel':
					case 'onPointerDown':
					case 'onPointerEnter':
					case 'onPointerLeave':
					case 'onPointerMove':
					case 'onPointerOut':
					case 'onPointerOver':
					case 'onPointerUp':
					case 'onProgress':
					case 'onRateChange':
					case 'onScroll':
					case 'onSeeked':
					case 'onSeeking':
					case 'onSelect':
					case 'onStalled':
					case 'onSubmit':
					case 'onSuspend':
					case 'onTimeUpdate':
					case 'onToggle':
					case 'onTouchCancel':
					case 'onTouchEnd':
					case 'onTouchMove':
					case 'onTouchStart':
					case 'onTransitionEnd':
					case 'onVolumeChange':
					case 'onWaiting':
					case 'onWheel':
					// attributes react special

					case 'checked':
					case 'className':
					case 'dangerouslySetInnerHTML':
					case 'htmlFor':
					case 'selected':
					case 'style':
					case 'suppressContentEditableWarning':
					case 'suppressHydrationWarning':
					case 'value':

					// svg
					case 'accentHeight':
					case 'accumulate':
					case 'additive':
					case 'alignmentBaseline':
					case 'allowReorder':
					case 'alphabetic':
					case 'amplitude':
					case 'arabicForm':
					case 'ascent':
					case 'attributeName':
					case 'attributeType':
					case 'autoReverse':
					case 'azimuth':
					case 'baseFrequency':
					case 'baselineShift':
					case 'baseProfile':
					case 'bbox':
					case 'begin':
					case 'bias':
					case 'by':
					case 'calcMode':
					case 'capHeight':
					case 'clip':
					case 'clipPath':
					case 'clipPathUnits':
					case 'clipRule':
					case 'colorInterpolation':
					case 'colorInterpolationFilters':
					case 'colorProfile':
					case 'colorRendering':
					case 'contentScriptType':
					case 'contentStyleType':
					case 'cursor':
					case 'cx':
					case 'cy':
					case 'd':
					case 'decelerate':
					case 'descent':
					case 'diffuseConstant':
					case 'direction':
					case 'display':
					case 'divisor':
					case 'dominantBaseline':
					case 'dur':
					case 'dx':
					case 'dy':
					case 'edgeMode':
					case 'elevation':
					case 'enableBackground':
					case 'end':
					case 'exponent':
					case 'externalResourcesRequired':
					case 'fill':
					case 'fillOpacity':
					case 'fillRule':
					case 'filter':
					case 'filterRes':
					case 'filterUnits':
					case 'floodColor':
					case 'floodOpacity':
					case 'focusable':
					case 'fontFamily':
					case 'fontSize':
					case 'fontSizeAdjust':
					case 'fontStretch':
					case 'fontStyle':
					case 'fontVariant':
					case 'fontWeight':
					case 'format':
					case 'from':
					case 'fx':
					case 'fy':
					case 'g1':
					case 'g2':
					case 'glyphName':
					case 'glyphOrientationHorizontal':
					case 'glyphOrientationVertical':
					case 'glyphRef':
					case 'gradientTransform':
					case 'gradientUnits':
					case 'hanging':
					case 'horizAdvX':
					case 'horizOriginX':
					case 'ideographic':
					case 'imageRendering':
					case 'in':
					case 'in2':
					case 'intercept':
					case 'k':
					case 'k1':
					case 'k2':
					case 'k3':
					case 'k4':
					case 'kernelMatrix':
					case 'kernelUnitLength':
					case 'kerning':
					case 'keyPoints':
					case 'keySplines':
					case 'keyTimes':
					case 'lengthAdjust':
					case 'letterSpacing':
					case 'lightingColor':
					case 'limitingConeAngle':
					case 'local':
					case 'markerEnd':
					case 'markerHeight':
					case 'markerMid':
					case 'markerStart':
					case 'markerUnits':
					case 'markerWidth':
					case 'mask':
					case 'maskContentUnits':
					case 'maskUnits':
					case 'mathematical':
					case 'mode':
					case 'numOctaves':
					case 'offset':
					case 'opacity':
					case 'operator':
					case 'order':
					case 'orient':
					case 'orientation':
					case 'origin':
					case 'overflow':
					case 'overlinePosition':
					case 'overlineThickness':
					case 'paintOrder':
					case 'panose1':
					case 'pathLength':
					case 'patternContentUnits':
					case 'patternTransform':
					case 'patternUnits':
					case 'pointerEvents':
					case 'points':
					case 'pointsAtX':
					case 'pointsAtY':
					case 'pointsAtZ':
					case 'preserveAlpha':
					case 'preserveAspectRatio':
					case 'primitiveUnits':
					case 'r':
					case 'radius':
					case 'refX':
					case 'refY':
					case 'renderingIntent':
					case 'repeatCount':
					case 'repeatDur':
					case 'requiredExtensions':
					case 'requiredFeatures':
					case 'restart':
					case 'result':
					case 'rotate':
					case 'rx':
					case 'ry':
					case 'scale':
					case 'seed':
					case 'shapeRendering':
					case 'slope':
					case 'spacing':
					case 'specularConstant':
					case 'specularExponent':
					case 'speed':
					case 'spreadMethod':
					case 'startOffset':
					case 'stdDeviation':
					case 'stemh':
					case 'stemv':
					case 'stitchTiles':
					case 'stopColor':
					case 'stopOpacity':
					case 'strikethroughPosition':
					case 'strikethroughThickness':
					case 'string':
					case 'stroke':
					case 'strokeDasharray':
					case 'strokeDashoffset':
					case 'strokeLinecap':
					case 'strokeLinejoin':
					case 'strokeMiterlimit':
					case 'strokeOpacity':
					case 'strokeWidth':
					case 'surfaceScale':
					case 'systemLanguage':
					case 'tableValues':
					case 'targetX':
					case 'targetY':
					case 'textAnchor':
					case 'textDecoration':
					case 'textLength':
					case 'textRendering':
					case 'to':
					case 'transform':
					case 'u1':
					case 'u2':
					case 'underlinePosition':
					case 'underlineThickness':
					case 'unicode':
					case 'unicodeBidi':
					case 'unicodeRange':
					case 'unitsPerEm':
					case 'vAlphabetic':
					case 'values':
					case 'vectorEffect':
					case 'version':
					case 'vertAdvY':
					case 'vertOriginX':
					case 'vertOriginY':
					case 'vHanging':
					case 'vIdeographic':
					case 'viewBox':
					case 'viewTarget':
					case 'visibility':
					case 'vMathematical':
					case 'widths':
					case 'wordSpacing':
					case 'writingMode':
					case 'x':
					case 'x1':
					case 'x2':
					case 'xChannelSelector':
					case 'xHeight':
					case 'xlinkActuate':
					case 'xlinkArcrole':
					case 'xlinkHref':
					case 'xlinkRole':
					case 'xlinkShow':
					case 'xlinkTitle':
					case 'xlinkType':
					case 'xmlBase':
					case 'xmlLang':
					case 'xmlns':
					case 'xmlnsXlink':
					case 'xmlSpace':
					case 'y':
					case 'y1':
					case 'y2':
					case 'yChannelSelector':
					case 'z':
					case 'zoomAndPan':

					// attributes html/react
					case '':
					case 'accept':
					case 'accept-charset':
					case 'acceptCharset':
					case 'acceptcharset':
					case 'accessKey':
					case 'accesskey':
					case 'action':
					case 'align':
					case 'allow':
					case 'allowFullScreen':
					case 'allowfullscreen':
					case 'alt':
					case 'async':
					case 'autocapitalize':
					case 'autoComplete':
					case 'autocomplete':
					case 'autoFocus':
					case 'autofocus':
					case 'autoPlay':
					case 'autoplay':
					case 'background':
					case 'bgcolor':
					case 'border':
					case 'buffered':
					case 'capture':
					case 'cellPadding':
					case 'cellpadding':
					case 'cellSpacing':
					case 'cellspacing':
					case 'challenge':
					case 'charSet':
					case 'charset':
					case 'cite':
					case 'class':
					case 'classID':
					case 'classid':
					case 'classname':
					case 'code':
					case 'codebase':
					case 'color':
					case 'cols':
					case 'colSpan':
					case 'colspan':
					case 'content':
					case 'contentEditable':
					case 'contenteditable':
					case 'contextMenu':
					case 'contextmenu':
					case 'controls':
					case 'controlsList':
					case 'controlslist':
					case 'coords':
					case 'crossOrigin':
					case 'crossorigin':
					case 'csp':
					case 'data':
					case 'dateTime':
					case 'datetime':
					case 'decoding':
					case 'default':
					case 'defer':
					case 'dir':
					case 'dirname':
					case 'disabled':
					case 'download':
					case 'draggable':
					case 'dropzone':
					case 'encType':
					case 'enctype':
					case 'enterkeyhint':
					case 'for':
					case 'form':
					case 'formAction':
					case 'formaction':
					case 'formEncType':
					case 'formenctype':
					case 'formMethod':
					case 'formmethod':
					case 'formNoValidate':
					case 'formnovalidate':
					case 'formTarget':
					case 'formtarget':
					case 'frameBorder':
					case 'frameborder':
					case 'headers':
					case 'height':
					case 'hidden':
					case 'high':
					case 'href':
					case 'hrefLang':
					case 'hreflang':
					case 'htmlfor':
					case 'http-equiv':
					case 'httpEquiv':
					case 'httpequiv':
					case 'icon':
					case 'id':
					case 'importance':
					case 'inputMode':
					case 'inputmode':
					case 'integrity':
					case 'intrinsicsize':
					case 'is':
					case 'ismap':
					case 'itemprop':
					case 'keyParams':
					case 'keyparams':
					case 'keyType':
					case 'keytype':
					case 'kind':
					case 'label':
					case 'lang':
					case 'language':
					case 'list':
					case 'loading':
					case 'loop':
					case 'low':
					case 'manifest':
					case 'marginHeight':
					case 'marginheight':
					case 'marginWidth':
					case 'marginwidth':
					case 'max':
					case 'maxLength':
					case 'maxlength':
					case 'media':
					case 'mediaGroup':
					case 'mediagroup':
					case 'method':
					case 'min':
					case 'minLength':
					case 'minlength':
					case 'multiple':
					case 'muted':
					case 'name':
					case 'nonce':
					case 'noValidate':
					case 'novalidate':
					case 'open':
					case 'optimum':
					case 'pattern':
					case 'ping':
					case 'placeholder':
					case 'poster':
					case 'preload':
					case 'profile':
					case 'radioGroup':
					case 'radiogroup':
					case 'readOnly':
					case 'readonly':
					case 'referrerpolicy':
					case 'rel':
					case 'required':
					case 'reversed':
					case 'role':
					case 'rows':
					case 'rowSpan':
					case 'rowspan':
					case 'sandbox':
					case 'scope':
					case 'scoped':
					case 'scrolling':
					case 'seamless':
					case 'shape':
					case 'size':
					case 'sizes':
					case 'slot':
					case 'span':
					case 'spellCheck':
					case 'spellcheck':
					case 'src':
					case 'srcDoc':
					case 'srcdoc':
					case 'srcLang':
					case 'srclang':
					case 'srcSet':
					case 'srcset':
					case 'start':
					case 'step':
					case 'summary':
					case 'tabIndex':
					case 'tabindex':
					case 'target':
					case 'title':
					case 'translate':
					case 'type':
					case 'useMap':
					case 'usemap':
					case 'width':
					case 'wmode':
					case 'wrap':
						break
					default:
						if (id.indexOf('data-') == -1 && this.warned[id] === undefined) {
							this.warned[id] = null
							console.trace(id)
						}
				}
			}
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

	if (this.debug) {
		if (props.className != '' && _props['no-validate'] === undefined) {
			this.validate_clases(props.className)
		}
	}

	return props
}

Style.prototype.prop_react_styles = function(style) {
	var styles = ''
	for (var id in style) {
		if (style[id] != '') styles += this.prop_hyphenate_style_name(id) + ':' + style[id] + ';'
	}
	return styles
}
Style.prototype.prop_hyphenate_style_name_uppercase_pattern = /([A-Z])/g
Style.prototype.prop_hyphenate_style_name = function(name) {
	return name.replace(this.prop_hyphenate_style_name_uppercase_pattern, '-$1').toLowerCase()
}
Style.prototype.process_styles = function(_categories, _styles) {
	//tick('process_styles')
	//console.log(_styles)
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
							: category.buffer.replace(category.replace, category.replacement)) +
						'}\n' +
						(category.post || '')
				}
			}
			categories = _categories()
		} else if (!property) {
			continue
		} else {
			found = false
			// bug
			if (header.indexOf(':after') === -1 && header.indexOf(':before') === -1) {
				for (id in categories) {
					category = categories[id]
					if (category.exp && category.exp.test(property)) {
						category.buffer += property + '\n'
						found = true
						break
					}
				}
			}
			if (!found) categories.unknown.buffer += property + '\n'
		}
	}
	//tick('process_styles')

	return styles.trim()
}

Style.prototype.normalize_styles = function(styles) {
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
Style.prototype.normalize_styles_properties = function(_, properties) {
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
Style.prototype.normalize_properties = function(properties) {
	//tick('normalize_css')
	properties = properties
		.replace(/\/\*[^*]+\*\//g, '') // remove comments: /* comment */
		.replace(/\/\/[^\n]+/g, '') // remove comments //
		.replace(/\s+/g, ' ') // deduplicate spaces

		.trim()

	//tick('normalize_css')
	return properties
}

Style.prototype.append_to_parent = function(styles) {
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
// run a user defined function before appending
Style.prototype.css_processors = []
Style.prototype.define_processor = function(fn) {
	this.css_processors.push(fn)
}
Style.prototype.sheet_process = function() {
	this.queue_process_added = false
	////tick('sheet_process')

	for (var id = 0; id < 6; id++) {
		if (this.sheet_queue[id].length) {
			var styles = this.sheet_queue[id].join('\n')
			this.sheet_queue[id].length = 0
			if (styles.indexOf('@') != -1) {
				styles = this.process_styles(this.post_style_categories, styles)
			}
			for (var i in this.css_processors) {
				styles = this.css_processors[i](styles)
			}
			if (!this.debug) {
				if (!this.sheet_insert[id]) {
					this.sheet_create_insert(id)
				}
				if (this.sheet_insert_rule[id]) {
					try {
						this.sheet_insert_rule[id]('@media{' + styles + '}', this.sheet_rules[id]++)
					} catch (e) {
						if (!this.sheet_append[id]) {
							this.sheet_create_append(id)
						}
						this.sheet_append[id].appendChild(document.createTextNode(styles))
						console.error(e)
					}
				} else {
					if (!this.sheet_append[id]) {
						this.sheet_create_append(id)
					}
					this.sheet_append[id].appendChild(document.createTextNode(styles))
				}
			} else {
				if (!this.sheet_append[id]) {
					this.sheet_create_append(id)
				}
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
					console.error('Style: looking for parent, the element does not exists.', element)
				}
			}
		}
		this.parent = parent_new
	}
	////tick('sheet_process parent')
}
Style.prototype.sheet_create_insert = function(id) {
	if (!this.sheet_insert[id]) {
		this.sheet_insert[id] = document.createElement('style')
		this.sheet_insert[id].appendChild(document.createTextNode(''))
		document.head.appendChild(this.sheet_insert[id])

		if (this.sheet_insert[id].sheet.insertRule)
			this.sheet_insert_rule[id] = this.sheet_insert[id].sheet.insertRule.bind(
				this.sheet_insert[id].sheet,
			)
	}
}
Style.prototype.sheet_create_append = function(id) {
	if (!this.sheet_append[id]) {
		this.sheet_append[id] = document.createElement('style')
		this.sheet_append[id].appendChild(document.createTextNode(''))
		document.head.appendChild(this.sheet_append[id])
	}
}
Style.prototype.validate_clases = function(classNames) {
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
				console.error(
					'Style: width|height with margin|border|padding declared without declaring a box-sizing'
				)
				console.log(styles)
			}
		}*/

	/*if (/animation/.test(css) && !/position:/.test(css)) {
			console.error('Style: animations should have a position')
		}
		if (/animation/.test(css) && !/will-change/.test(css)) {
			console.error(
				'Style: animations should have will-change for the animated properties'
			)
		}*/
}
Style.prototype.properties_id = function(properties) {
	return (
		'c' + // class names should start with a letter! or these will not work.
		(!this.debug && this.properties[properties]
			? this.properties[properties]
			: (this.properties[properties] = ++this.properties_counter))
	)
}
Style.prototype.index_attributes = function() {
	this.attributes = {
		style: [
			function(attribute_value, _props, values) {
				if (typeof attribute_value == 'string') {
					values.classNames += this.classNames(attribute_value, 3) + ' '
				} else {
					values.classNames += this.classNames(this.prop_react_styles(attribute_value), 3) + ' '
				}
			}.bind(this),
		],
		css: [
			function(attribute_value, _props, values) {
				values.classNames += this.classNames(attribute_value, 2) + ' '
			}.bind(this),
		],
		'css-parent': [
			function(attribute_value, _props, values) {
				this.append_to_parent(attribute_value)
			}.bind(this),
		],
		'no-validate': [function() {}],
	}

	for (var id in this.css_property) {
		if (!this.attributes[id]) this.attributes[id] = []
		this.attributes[id].push(
			function(id, attribute_value, _props, values) {
				values.styles += this.css_property[id]
			}.bind(this, id),
		)
	}
	for (var id in this.css_property_high_priority) {
		if (!this.attributes[id]) this.attributes[id] = []
		this.attributes[id].push(
			function(id, attribute_value, _props, values) {
				values.styles += this.css_property_high_priority[id]
			}.bind(this, id),
		)
	}
	for (var id in this.css_property_value) {
		if (!this.attributes[id]) this.attributes[id] = []
		this.attributes[id].push(
			function(id, attribute_value, _props, values) {
				if (attribute_value != undefined) {
					values.styles += this.css_property_value[id] + attribute_value + ';'
				}
			}.bind(this, id),
		)
	}
	for (var id in this.css_property_fn) {
		if (!this.attributes[id]) this.attributes[id] = []
		this.attributes[id].push(
			function(id, attribute_value, _props, values) {
				values.styles += this.css_property_fn[id](attribute_value, _props)
			}.bind(this, id),
		)
	}
	for (var id in this.css_property_fn_high_priority) {
		if (!this.attributes[id]) this.attributes[id] = []
		this.attributes[id].push(
			function(id, attribute_value, _props, values) {
				values.classNames +=
					this.classNames(this.css_property_fn_high_priority[id](attribute_value, _props), 4) + ' '
			}.bind(this, id),
		)
	}
	this.to_fast_properties(this.attributes)
}
Style.prototype.queue_process = function() {
	if (!this.queue_process_added) {
		this.queue_process_added = true
		this.task(this.sheet_process)
	}
}
// helpers
Style.prototype.unique = function(b) {
	var a = []
	for (var i = 0, l = b.length; i < l; i++) {
		if (a.indexOf(b[i]) === -1) a.push(b[i])
	}
	return a
}
Style.prototype.task = function(fn) {
	Promise.resolve().then(fn)
}
// memoize functions
Style.prototype.serialize = function(o) {
	return JSON.stringify(o, this._serialize)
}
Style.prototype._serialize = function(k, v) {
	if (typeof v == 'function') {
		return v.name
	} else {
		return v
	}
}
Style.prototype.is_primitive = function(o) {
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
Style.prototype.memo = function(fn) {
	return function(fn, cache, serialize, is_primitive, ...args) {
		const k = args.length == 1 && is_primitive(args[0]) ? args[0] : serialize(args)

		return cache[k] !== undefined ? cache[k] : (cache[k] = fn(...args))
	}.bind(null, fn, {}, this.serialize, this.is_primitive)
}

Style = new Style()
const css = Style.css
const Box = Style.Box
