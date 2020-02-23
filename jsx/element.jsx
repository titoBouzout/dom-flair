'use strict'

@observer
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
		if (props && props.item) {
			props.item.children = props.item.children || []
			props.item.style = props.item.style || {}
			props.item.id = props.item.id || guid()
		}
	}
	@action
	updateItem(props) {
		Element.updateProps(props)
		this.item = props.item
		this.item[Symbol.for('instance')] = this
		this.parent = props.parent

		if (!g.Active) {
			select_item(g.Tree.active || this.item)
		}
		if (!this.parent) {
			g.Root = this
		}
	}
	render() {
		return (
			<Box
				reference={this.reference}
				name={this.item.class || ''}
				onMouseDown={this.onClick}
				data-selected={(g.Active && g.Active.item.id == this.item.id) || null}
				draggable={this.parent ? true : false}
				onDragStart={this.onDragStart}
				onDrop={this.onDrop}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDragEnd={this.onDragEnd}
				{...this.item.style}
				className={this.item.class || ''}
			>
				<Box
					element="span"
					no-empty
					contentEditable={true}
					onMouseDown={this.onClick}
					onBlur={function(e) {
						update_tree(this.item.id, function(item, style, parent) {
							item.content = e.currentTarget.innerText || null
						})
					}.bind(this)}
				>
					{this.item.content}
				</Box>

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

				{this.item.children.map(
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
			if (e.ctrlKey) {
				e.dataTransfer.dropEffect = 'copy'
			} else {
				e.dataTransfer.dropEffect = 'move'
			}

			g.dragged_element = this.item
			document.querySelector('body').setAttribute('data-dragging', true)
		}
	}
	onDragEnd(e) {
		document.querySelector('body').removeAttribute('data-dragging')
		g.dragged_element = null
		g.dragged_over_element = null
	}
	onDragLeave(e) {
		e.currentTarget.removeAttribute('data-dragging-over')
	}
	@action
	onDragOver(e) {
		if (e.target == e.currentTarget) {
			if (
				this.item.id != g.dragged_element.id &&
				!element_includes(g.dragged_element.id, this.item)
			) {
				e.preventDefault()
				e.stopPropagation()
				if (e.ctrlKey) {
					e.dataTransfer.dropEffect = 'copy'
				} else {
					e.dataTransfer.dropEffect = 'move'
				}
				e.currentTarget.setAttribute('data-dragging-over', true)
				g.dragged_over_element = this.item
			} else {
				g.dragged_over_element = null
			}
		}
	}
	@action
	onDrop(e) {
		document.querySelector('body').removeAttribute('data-dragging')

		e.currentTarget.removeAttribute('data-dragging-over')

		e.preventDefault()
		e.stopPropagation()
		if (g.dragged_element) {
			var c = copy(g.dragged_element)
			var dragged_element_id = g.dragged_element.id
			var dragged_over_element_id = g.dragged_over_element.id
			if (e.ctrlKey) {
				update_tree(dragged_over_element_id, function(item, style, parent) {
					patch_array(item.children, function(a) {
						a.push(c)
						return a
					})
				})
			} else {
				update_tree(
					dragged_element_id,
					function(item, style, parent) {
						if (parent && parent.children) {
							patch_array(parent.children, function(a) {
								a.splice(parent.children.indexOf(item), 1)
								return a
							})
						}
					},
					true,
				)
				update_tree(dragged_over_element_id, function(item, style, parent) {
					patch_array(item.children, function(a) {
						a.push(c)
						return a
					})
				})
			}
			setTimeout(function() {
				select_item(dragged_element_id)
			}, 0)

			g.dragged_element = null
			g.dragged_over_element = null
		}
	}
	appendLeft(e) {
		if (this.parent) {
			if (e.ctrlKey) {
				var c = copy(this.item)
			} else {
				var c = new_element()
			}
			update_tree(this.item.id, function(item, style, parent) {
				if (parent && parent.children) {
					patch_array(parent.children, function(a) {
						a.splice(parent.children.indexOf(item), 0, c)
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
				var c = new_element()
			}
			update_tree(this.item.id, function(item, style, parent) {
				if (parent && parent.children) {
					patch_array(parent.children, function(a) {
						a.splice(parent.children.indexOf(item) + 1, 0, c)
						return a
					})
				}
			})
		}
	}
}
