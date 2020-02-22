'use strict'

class Element extends Component {
	constructor(props) {
		super(props)
		this.updateItem(props)
		this.state = {}
		this.reference = React.createRef()
	}
	componentDidUpdate(props, state) {
		this.updateItem(props)
		this.updateItem(this.props)
	}

	static getDerivedStateFromProps(props, state) {
		Element.updateProps(props)
		return null
	}
	@action
	static updateProps(props) {
		props.item.c = props.item.c || []
		props.item.style = props.item.style || {}
		props.item.id = props.item.id || guid()
	}
	@action
	updateItem(props) {
		Element.updateProps(props)
		this.item = props.item
		this.item[Symbol.for('instance')] = this
		this.parent = props.parent

		if (!g.Active) {
			select_item(this.item)
		}
	}
	render() {
		return (
			<Box
				reference={this.reference}
				className={this.item.class || ''}
				name={this.item.class || ''}
				onClick={this.onClick}
				data-selected={(g.Active && g.Active.item.id == this.item.id) || null}
				draggable="true"
				onDragStart={this.onDragStart}
				onDrop={this.onDrop}
				onDragOver={this.onDragOver}
				{...this.item.style}
			>
				<span
					contentEditable={true}
					onBlur={function(e) {
						update_tree(this.item.id, function(item, style, parent) {
							item.content = e.currentTarget.innerText || null
						})
					}.bind(this)}
				>
					{this.item.content}
				</span>
				<IF condition={this.parent}>
					<span
						className="el-tool-copy-left"
						title={g.ctrlKey ? 'Copy To Left' : 'New To Left'}
						onClick={this.appendLeft}
					/>

					<span
						className="el-tool-copy-right"
						title={g.ctrlKey ? 'Copy To Right' : 'New To Right'}
						onClick={this.appendRight}
					/>
				</IF>
				{this.item.c.map(
					function(child, idx) {
						return <Element item={child} key={idx} parent={this.item} />
					}.bind(this),
				)}
			</Box>
		)
	}
	onClick(e) {
		if (e.currentTarget === e.target) {
			select_item(this.item)
		}
	}
	@action
	onDragStart(e) {
		if (e.target == e.currentTarget) {
			e.dataTransfer.dropEffect = 'copy'
			g.draggedElement = this
			document.querySelector('body').setAttribute('data-dragging', true)
		}
	}
	onDragOver(e) {
		document.querySelector('body').setAttribute('data-dragging', false)
		e.preventDefault()
		e.stopPropagation()
		e.dataTransfer.dropEffect = 'copy'
	}
	@action
	onDrop(e) {
		e.preventDefault()
		e.stopPropagation()
		if (g.draggedElement) {
			this.item.c.push(copy(g.draggedElement.item))
			g.draggedElement = false
			save()
		}
	}
	appendLeft(e) {
		if (this.parent) {
			if (e.ctrlKey) {
				var c = copy(this.item)
			} else {
				var c = {}
			}
			update_tree(this.item.id, function(item, style, parent) {
				if (parent && parent.c) {
					patch_array(parent.c, function(a) {
						a.splice(parent.c.indexOf(item), 0, c)
						return a
					})
				}
			})
		}
	}
	appendRight(e) {
		if (this.parent) {
			if (e.ctrlKey) {
				var c = copy(this.item)
			} else {
				var c = {}
			}
			update_tree(this.item.id, function(item, style, parent) {
				if (parent && parent.c) {
					patch_array(parent.c, function(a) {
						a.splice(parent.c.indexOf(item) + 1, 0, c)
						return a
					})
				}
			})
		}
	}
}
