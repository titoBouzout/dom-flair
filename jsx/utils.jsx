'use strict'

class Component extends React.Component {
	bind_not = {
		componentDidCatch: null,
		componentDidMount: null,
		componentDidUpdate: null,
		componentWillMount: null,
		componentWillReceiveProps: null,
		componentWillUnmount: null,
		componentWillUpdate: null,
		constructor: null,
		forceUpdate: null,
		getSnapshotBeforeUpdate: null,
		name: null,
		props: null,
		render: null,
		setState: null,
		shouldComponentUpdate: null,
		state: null,
		UNSAFE_componentWillMount: null,
		UNSAFE_componentWillReceiveProps: null,
		UNSAFE_componentWillUpdate: null,
	}
	constructor(props) {
		super(props)

		this.bind(this)
		return observer(this)
	}

	bind(o) {
		for (var m of Object.getOwnPropertyNames(Object.getPrototypeOf(o))) {
			if (o[m] && o[m].bind && this.bind_not[m] === undefined && typeof o[m] == 'function') {
				o[m] = o[m].bind(o)
			}
		}
	}
}

class OptionGroup extends Component {
	render() {
		return (
			<React.Fragment>
				<hr />
				<Box element="details" width open={!this.props.closed}>
					<Box element="summary" text-capitalize>
						{this.props.title}
					</Box>
					{this.props.children}
				</Box>
			</React.Fragment>
		)
	}
}

class Option extends Component {
	render() {
		return (
			<Box text-small row margin-top=".5rem" width>
				{this.props.children}
			</Box>
		)
	}
}

class OptionTitle extends Component {
	render() {
		return (
			<Box padding-left="1.7rem" padding-top=".5rem" top text-capitalize>
				{this.props.children}
			</Box>
		)
	}
}

class OptionValue extends Component {
	render() {
		return (
			<Box padding-left=".5rem" grow right wrap>
				{this.props.children}
			</Box>
		)
	}
}

class OptionInput extends Component {
	render() {
		return (
			<Box
				element="div"
				row
				className="sidebar-input"
				width="11rem"
				onBlur={this.props.onChange && this.onChange}
				title={this.props.title}
				contentEditable="true"
				dangerouslySetInnerHTML={{ __html: this.props.value }}
			/>
		)
	}
	onChange(e) {
		this.props.onChange(e.target.innerText.trim())
	}
}

class OptionTextarea extends Component {
	render() {
		return (
			<Box
				element="div"
				className="sidebar-input"
				width="11rem"
				height="3rem"
				onBlur={this.props.onChange && this.onChange}
				title={this.props.title}
				scroll-y
				scroll-thin
				contentEditable="true"
				dangerouslySetInnerHTML={{ __html: this.props.value }}
			/>
		)
	}
	onChange(e) {
		this.props.onChange(e.target.innerText.trim())
	}
}

class OptionInputSmall extends Component {
	render() {
		return (
			<Box
				element="div"
				row
				width="3em"
				className="sidebar-input"
				onBlur={this.props.onChange && this.onChange}
				title={this.props.title}
				contentEditable="true"
				dangerouslySetInnerHTML={{ __html: this.props.value }}
			/>
		)
	}
	onChange(e) {
		this.props.onChange(e.target.innerText.trim())
	}
}

class OptionIcon extends Component {
	render() {
		return (
			<Box
				text-no-wrap
				text-crop
				wrap
				className="sidebar-icon"
				onClick={this.props.onChange && this.props.onChange}
				data-selected={this.props.value ? true : false}
				center
			>
				{this.props.children}
			</Box>
		)
	}
}

class ColorPicker extends Component {
	constructor(props) {
		super(props)
		this.className = 'c1' + String(Math.random()).replace(/\./g, '')
	}
	componentDidMount() {
		Pickr.create({
			el: '.' + this.className,
			useAsButton: true,

			theme: 'nano', // or 'monolith', or 'nano'
			default: '#FFF',
			swatches: [
				'rgba(244, 67, 54, 1)',
				'rgba(233, 30, 99, 1)',
				'rgba(156, 39, 176, 1)',
				'rgba(103, 58, 183, 1)',
				'rgba(63, 81, 181, 1)',
				'rgba(33, 150, 243, 1)',
				'rgba(3, 169, 244, 1)',
				'rgba(0, 188, 212, 1)',
				'rgba(0, 150, 136, 1)',
				'rgba(76, 175, 80, 1)',
				'rgba(139, 195, 74, 1)',
				'rgba(205, 220, 57, 1)',
				'rgba(255, 235, 59, 1)',
				'rgba(255, 193, 7, 1)',
			],

			components: {
				// Main components
				preview: true,
				opacity: true,
				hue: true,

				// Input / output Options
				interaction: {
					hex: true,
					rgba: true,
					hsla: true,
					hsva: true,
					cmyk: true,
					input: true,
					clear: true,
					save: true,
				},
			},
		}).on(
			'change',
			function(color, instance) {
				clearTimeout(this.timeout)
				this.timeout = setTimeout(
					function() {
						this.props.onChange(
							color
								.toRGBA()
								.toString()
								.replace(/\.[0-9]+,/g, ','),
						)
					}.bind(this),
					300,
				)
			}.bind(this),
		)
	}
	render() {
		return (
			<Box
				className={'sidebar-icon sidebar-color-picker ' + this.className}
				background-color={this.props.value}
			>
				{this.props.children}
			</Box>
		)
	}
}

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Sidebar />
				<Content />
			</React.Fragment>
		)
	}
}

class Content extends Component {
	render() {
		return (
			<Box row grow className="content">
				<Element item={g.Tree} />
			</Box>
		)
	}
}

function IF(props) {
	if (props.condition) {
		return props.children || null
	} else {
		return null
	}
}
