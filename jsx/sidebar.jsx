'use strict'
@observer
class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	static getDerivedStateFromProps(props, state) {
		if (g.Active) Element.updateProps(g.Active)
		return null
	}
	render() {
		if (!g.Active) {
			return (
				<Box column className="sidebar">
					<b>Layout Editor</b>
					<hr />
				</Box>
			)
		} else {
			var parent = g.Active.parent
			var item = g.Active.item
			var style = item.style

			return (
				<Box
					className="sidebar"
					column
					scroll-y
					scroll-thin
					scroll-background="#444242"
					scroll-color="#797575"
					selection-none
				>
					<b>Layout Editor</b>
					<OptionGroup
						title={
							<Box row grow>
								<Box grow>Element</Box> #{item.id}
							</Box>
						}
					>
						<Option>
							<OptionTitle>classname</OptionTitle>
							<OptionValue>
								<OptionInput
									value={item.class}
									onChange={e => {
										e = e.replace(/\s/g, '-')
										update_tree(item.id, function(item, style, parent) {
											item.class = e || null
											if (!item.class) delete item.class
										})
									}}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>content</OptionTitle>
							<OptionValue>
								<OptionTextarea
									value={item.content}
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											item.content = e || null
											if (!item.content) delete item.content
										})
									}}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>add children</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										var c = new_element()
										update_tree(item.id, function(item, style, parent) {
											item.children.push(c)
										})
									}}
								>
									<i className="fa fa-plus" />
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>empty element</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											item.children = []
										})
									}}
								>
									<i className="fa fa-trash" />
								</OptionIcon>
							</OptionValue>
						</Option>
						<IF condition={parent}>
							<Option>
								<OptionTitle>delete element</OptionTitle>
								<OptionValue>
									<OptionIcon
										onChange={e => {
											update_tree(item.id, function(item, style, parent) {
												if (parent && parent.children) {
													patch_array(parent.children, function(a) {
														a.splice(parent.children.indexOf(item), 1)
														return a
													})

													if (parent.children.length) {
														select_item(parent.children[parent.children.length - 1])
													} else {
														select_item(parent)
													}
												}
											})
										}}
									>
										<i className="fa fa-trash" />
									</OptionIcon>
								</OptionValue>
							</Option>
							<IF condition={element_count(item.id).length > 1}>
								<Option>
									<OptionTitle>delete clones</OptionTitle>
									<OptionValue>
										<OptionIcon
											onChange={e => {
												var count = 0
												update_tree(item.id, function(item, style, parent) {
													if (parent && parent.children) {
														count++
														if (count == 1) {
															return
														}
														patch_array(parent.children, function(a) {
															a.splice(parent.children.indexOf(item), 1)
															return a
														})

														if (parent.children.length) {
															select_item(parent.children[parent.children.length - 1])
														} else {
															select_item(parent)
														}
													}
												})
											}}
										>
											<i className="fa fa-trash" />
										</OptionIcon>
									</OptionValue>
								</Option>
							</IF>
						</IF>
					</OptionGroup>
					<OptionGroup title="Layout">
						<Option>
							<OptionTitle>orientation</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.row) {
												delete style.row
											} else {
												style.row = true
												delete style.column
											}
										})
									}}
									value={style.row}
								>
									Row
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.column) {
												delete style.column
											} else {
												style.column = true
												delete style.row
											}
										})
									}}
									value={style.column}
								>
									Column
								</OptionIcon>
							</OptionValue>
						</Option>

						<Option>
							<OptionTitle>wrap</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.wrap) {
												delete style.wrap
											} else {
												style.wrap = true
												delete style['no-wrap']
											}
										})
									}}
									value={style.wrap}
								>
									wrap
								</OptionIcon>

								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['no-wrap']) {
												delete style['no-wrap']
											} else {
												style['no-wrap'] = true
												delete style.wrap
											}
										})
									}}
									value={style['no-wrap']}
								>
									no-wrap
								</OptionIcon>
							</OptionValue>
						</Option>

						<Option>
							<OptionTitle>grow</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.grow) {
												delete style.grow
											} else {
												style.grow = true
											}
										})
									}}
									value={style.grow}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>display</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['inline']) {
												delete style['inline']
											} else {
												style['inline'] = true
												delete style['block']
												delete style['inline-block']
												delete style['flex']
												delete style['inline-flex']
											}
										})
									}}
									value={style['inline']}
								>
									inline
								</OptionIcon>

								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['block']) {
												delete style['block']
											} else {
												style['block'] = true
												delete style['inline']
												delete style['inline-block']
												delete style['flex']
												delete style['inline-flex']
											}
										})
									}}
									value={style['block']}
								>
									block
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['inline-block']) {
												delete style['inline-block']
											} else {
												style['inline-block'] = true
												delete style['inline']
												delete style['block']
												delete style['flex']
												delete style['inline-flex']
											}
										})
									}}
									value={style['inline-block']}
								>
									iblock
								</OptionIcon>

								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['flex']) {
												delete style['flex']
											} else {
												style['flex'] = true
												delete style['inline']
												delete style['block']
												delete style['inline-block']
												delete style['inline-flex']
											}
										})
									}}
									value={style['flex']}
								>
									flex
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['inline-flex']) {
												delete style['inline-flex']
											} else {
												style['inline-flex'] = true
												delete style['inline']
												delete style['block']
												delete style['inline-block']
												delete style['flex']
											}
										})
									}}
									value={style['inline-flex']}
								>
									iflex
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>position</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['relative']) {
												delete style['relative']
											} else {
												style['relative'] = true
												delete style['absolute']
												delete style['fixed']
											}
										})
									}}
									value={style['relative']}
								>
									relative
								</OptionIcon>

								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['absolute']) {
												delete style['absolute']
											} else {
												style['absolute'] = true
												delete style['relative']
												delete style['fixed']
											}
										})
									}}
									value={style['absolute']}
								>
									absolute
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['fixed']) {
												delete style['fixed']
											} else {
												style['fixed'] = true
												delete style['relative']
												delete style['absolute']
											}
										})
									}}
									value={style['fixed']}
								>
									fixed
								</OptionIcon>
							</OptionValue>
						</Option>
					</OptionGroup>
					<OptionGroup title="Alignment">
						<Option>
							<OptionTitle> center</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.center) {
												delete style.center
											} else {
												style.center = true
												delete style.bottom
												delete style.vertical
												delete style.top
												delete style.left
												delete style.horizontal
												delete style.right
											}
										})
									}}
									value={style.center}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle> vertical</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.bottom) {
												delete style.bottom
											} else {
												style.bottom = true
												delete style.top
												delete style.vertical
												delete style.center
											}
										})
									}}
									value={style.bottom}
								>
									<i className="fa fa-align-right fa-fw fa-rotate-90" />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.vertical) {
												delete style.vertical
											} else {
												style.vertical = true
												delete style.bottom
												delete style.top
												delete style.center
											}
										})
									}}
									value={style.vertical}
								>
									<i className="fa fa-align-center fa-fw fa-rotate-90" />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.top) {
												delete style.top
											} else {
												style.top = true
												delete style.bottom
												delete style.vertical
												delete style.center
											}
										})
									}}
									value={style.top}
								>
									<i className="fa fa-align-left fa-fw fa-rotate-90" />
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>horizontal</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.left) {
												delete style.left
											} else {
												style.left = true
												delete style.right
												delete style.horizontal
												delete style.center
											}
										})
									}}
									value={style.left}
								>
									<i className="fa fa-align-left fa-fw " />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.horizontal) {
												delete style.horizontal
											} else {
												style.horizontal = true
												delete style.right
												delete style.left
												delete style.center
											}
										})
									}}
									value={style.horizontal}
								>
									<i className="fa fa-align-center fa-fw " />
								</OptionIcon>

								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.right) {
												delete style.right
											} else {
												style.right = true
												delete style.left
												delete style.horizontal
												delete style.center
											}
										})
									}}
									value={style.right}
								>
									<i className="fa fa-align-right fa-fw " />
								</OptionIcon>
							</OptionValue>
						</Option>
					</OptionGroup>
					<OptionGroup title="Space between" closed>
						<Option>
							<OptionTitle>around</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['space-around']) {
												delete style['space-around']
											} else {
												style['space-around'] = true
												//delete style['space-around']
												delete style['space-around-horizontal']
												delete style['space-around-vertical']
												delete style['space-between']
												delete style['space-between-horizontal']
												delete style['space-between-vertical']
												delete style['space-evenly']
												delete style['space-evenly-horizontal']
												delete style['space-evenly-vertical']
											}
										})
									}}
									value={style['space-around']}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['space-around-horizontal']) {
												delete style['space-around-horizontal']
											} else {
												style['space-around-horizontal'] = true
												delete style['space-around']
												//delete style['space-around-horizontal']
												delete style['space-around-vertical']
												delete style['space-between']
												delete style['space-between-horizontal']
												delete style['space-between-vertical']
												delete style['space-evenly']
												delete style['space-evenly-horizontal']
												delete style['space-evenly-vertical']
											}
										})
									}}
									value={style['space-around-horizontal']}
								>
									<i className="fa fa-align-center fa-fw " />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['space-around-vertical']) {
												delete style['space-around-vertical']
											} else {
												style['space-around-vertical'] = true
												delete style['space-around']
												delete style['space-around-horizontal']
												//delete style['space-around-vertical']
												delete style['space-between']
												delete style['space-between-horizontal']
												delete style['space-between-vertical']
												delete style['space-evenly']
												delete style['space-evenly-horizontal']
												delete style['space-evenly-vertical']
											}
										})
									}}
									value={style['space-around-vertical']}
								>
									<i className="fa fa-align-center fa-fw fa-rotate-90" />
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>between</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['space-between']) {
												delete style['space-between']
											} else {
												style['space-between'] = true
												delete style['space-around']
												delete style['space-around-horizontal']
												delete style['space-around-vertical']
												//delete style['space-between']
												delete style['space-between-horizontal']
												delete style['space-between-vertical']
												delete style['space-evenly']
												delete style['space-evenly-horizontal']
												delete style['space-evenly-vertical']
											}
										})
									}}
									value={style['space-between']}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['space-between-horizontal']) {
												delete style['space-between-horizontal']
											} else {
												style['space-between-horizontal'] = true
												delete style['space-around']
												delete style['space-around-horizontal']
												delete style['space-around-vertical']
												delete style['space-between']
												// delete style['space-between-horizontal']
												delete style['space-between-vertical']
												delete style['space-evenly']
												delete style['space-evenly-horizontal']
												delete style['space-evenly-vertical']
											}
										})
									}}
									value={style['space-between-horizontal']}
								>
									<i className="fa fa-align-center fa-fw " />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['space-between-vertical']) {
												delete style['space-between-vertical']
											} else {
												style['space-between-vertical'] = true
												delete style['space-around']
												delete style['space-around-horizontal']
												delete style['space-around-vertical']
												delete style['space-between']
												delete style['space-between-horizontal']
												//delete style['space-between-vertical']
												delete style['space-evenly']
												delete style['space-evenly-horizontal']
												delete style['space-evenly-vertical']
											}
										})
									}}
									value={style['space-between-vertical']}
								>
									<i className="fa fa-align-center fa-fw fa-rotate-90" />
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>evenly</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['space-evenly']) {
												delete style['space-evenly']
											} else {
												style['space-evenly'] = true
												delete style['space-around']
												delete style['space-around-horizontal']
												delete style['space-around-vertical']
												delete style['space-between']
												delete style['space-between-horizontal']
												delete style['space-between-vertical']
												//delete style['space-evenly']
												delete style['space-evenly-horizontal']
												delete style['space-evenly-vertical']
											}
										})
									}}
									value={style['space-evenly']}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['space-evenly-horizontal']) {
												delete style['space-evenly-horizontal']
											} else {
												style['space-evenly-horizontal'] = true
												delete style['space-around']
												delete style['space-around-horizontal']
												delete style['space-around-vertical']
												delete style['space-between']
												delete style['space-between-horizontal']
												delete style['space-between-vertical']
												delete style['space-evenly']
												// delete style['space-evenly-horizontal']
												delete style['space-evenly-vertical']
											}
										})
									}}
									value={style['space-evenly-horizontal']}
								>
									<i className="fa fa-align-center fa-fw " />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['space-evenly-vertical']) {
												delete style['space-evenly-vertical']
											} else {
												style['space-evenly-vertical'] = true
												delete style['space-around']
												delete style['space-around-horizontal']
												delete style['space-around-vertical']
												delete style['space-between']
												delete style['space-between-horizontal']
												delete style['space-between-vertical']
												delete style['space-evenly']
												delete style['space-evenly-horizontal']
												//delete style['space-evenly-vertical']
											}
										})
									}}
									value={style['space-between-vertical']}
								>
									<i className="fa fa-align-center fa-fw fa-rotate-90" />
								</OptionIcon>
							</OptionValue>
						</Option>
					</OptionGroup>
					<OptionGroup title="Dimensions" closed>
						<Option>
							<OptionTitle>full</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.full) {
												delete style.full
											} else {
												style.full = true
											}
										})
									}}
									value={style.full}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>width</OptionTitle>
							<OptionValue>
								<OptionInput
									title="width"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['width'] = e || null
											if (style['width'] === null) delete style['width']
										})
									}}
									value={style['width']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>min-width</OptionTitle>
							<OptionValue>
								<OptionInput
									title="min-width"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['min-width'] = e || null
											if (style['min-width'] === null) delete style['min-width']
										})
									}}
									value={style['min-width']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>max-width</OptionTitle>
							<OptionValue>
								<OptionInput
									title="max-width"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['max-width'] = e || null
											if (style['max-width'] === null) delete style['max-width']
										})
									}}
									value={style['max-width']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>height</OptionTitle>
							<OptionValue>
								<OptionInput
									title="height"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['height'] = e || null
											if (style['height'] === null) delete style['height']
										})
									}}
									value={style['height']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>min-height</OptionTitle>
							<OptionValue>
								<OptionInput
									title="min-height"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['min-height'] = e || null
											if (style['min-height'] === null) delete style['min-height']
										})
									}}
									value={style['min-height']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>max-height</OptionTitle>
							<OptionValue>
								<OptionInput
									title="max-height"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['max-height'] = e || null
											if (style['max-height'] === null) delete style['max-height']
										})
									}}
									value={style['max-height']}
								/>
							</OptionValue>
						</Option>
					</OptionGroup>
					<OptionGroup title="Padding Margin Border" closed>
						<Option>
							<OptionTitle>box-sizing</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['border-box']) {
												delete style['border-box']
											} else {
												style['border-box'] = true
												delete style['content-box']
											}
										})
									}}
									value={style['border-box']}
								>
									border
								</OptionIcon>

								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['content-box']) {
												delete style['content-box']
											} else {
												style['content-box'] = true
												delete style['border-box']
											}
										})
									}}
									value={style['content-box']}
								>
									content
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>
								<u>
									<b>padding</b>
								</u>
							</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="padding"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['padding'] = e || null
											if (style['padding'] === null) delete style['padding']
										})
									}}
									value={style['padding']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>top</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="padding-top"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['padding-top'] = e || null
											if (style['padding-top'] === null) delete style['padding-top']
										})
									}}
									value={style['padding-top']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>left</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="padding-left"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['padding-left'] = e || null
											if (style['padding-left'] === null) delete style['padding-left']
										})
									}}
									value={style['padding-left']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>bottom</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="padding-bottom"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['padding-bottom'] = e || null
											if (style['padding-bottom'] === null) delete style['padding-bottom']
										})
									}}
									value={style['padding-bottom']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>right</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="padding-right"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['padding-right'] = e || null
											if (style['padding-right'] === null) delete style['padding-right']
										})
									}}
									value={style['padding-right']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>
								<u>
									<b>border</b>
								</u>
							</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="border"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['border'] = e || null
											if (style['border'] === null) delete style['border']
										})
									}}
									value={style['border']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>top</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="border-top"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['border-top'] = e || null
											if (style['border-top'] === null) delete style['border-top']
										})
									}}
									value={style['border-top']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>left</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="border-left"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['border-left'] = e || null
											if (style['border-left'] === null) delete style['border-left']
										})
									}}
									value={style['border-left']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>bottom</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="border-bottom"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['border-bottom'] = e || null
											if (style['border-bottom'] === null) delete style['border-bottom']
										})
									}}
									value={style['border-bottom']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>right</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="border-right"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['border-right'] = e || null
											if (style['border-right'] === null) delete style['border-right']
										})
									}}
									value={style['border-right']}
								/>
							</OptionValue>
						</Option>

						<Option>
							<OptionTitle>radius</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="radius"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['radius'] = e || null
											if (style['radius'] === null) delete style['radius']
										})
									}}
									value={style['radius']}
								/>
							</OptionValue>
						</Option>

						<Option>
							<OptionTitle>
								<u>
									<b>margin</b>
								</u>
							</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="margin"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['margin'] = e || null
											if (style['margin'] === null) delete style['margin']
										})
									}}
									value={style['margin']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>top</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="margin-top"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['margin-top'] = e || null
											if (style['margin-top'] === null) delete style['margin-top']
										})
									}}
									value={style['margin-top']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>left</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="margin-left"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['margin-left'] = e || null
											if (style['margin-left'] === null) delete style['margin-left']
										})
									}}
									value={style['margin-left']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>bottom</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="margin-bottom"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['margin-bottom'] = e || null
											if (style['margin-bottom'] === null) delete style['margin-bottom']
										})
									}}
									value={style['margin-bottom']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>right</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="margin-right"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['margin-right'] = e || null
											if (style['margin-right'] === null) delete style['margin-right']
										})
									}}
									value={style['margin-right']}
								/>
							</OptionValue>
						</Option>
					</OptionGroup>

					<OptionGroup title="Text" closed>
						<Option>
							<OptionTitle>size</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="text-size"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['text-size'] = e || null
											if (style['text-size'] === null) delete style['text-size']
										})
									}}
									value={style['text-size']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>small</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-small']) {
												delete style['text-small']
											} else {
												style['text-small'] = true
											}
										})
									}}
									value={style['text-small']}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
							</OptionValue>
						</Option>

						<Option>
							<OptionTitle>weight</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-bold']) {
												delete style['text-bold']
											} else {
												style['text-bold'] = true
												delete style['text-regular']
											}
										})
									}}
									value={style['text-bold']}
								>
									bold
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-regular']) {
												delete style['text-regular']
											} else {
												style['text-regular'] = true
												delete style['text-bold']
											}
										})
									}}
									value={style['text-regular']}
								>
									regular
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>multiline</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-multiline']) {
												delete style['text-multiline']
											} else {
												style['text-multiline'] = true
											}
										})
									}}
									value={style['text-multiline']}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
							</OptionValue>
						</Option>

						<Option>
							<OptionTitle>align</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-align'] == 'left') {
												delete style['text-align']
											} else {
												style['text-align'] = 'left'
											}
										})
									}}
									value={style['text-align'] == 'left'}
								>
									<i className="fa fa-align-left fa-fw " />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-align'] == 'center') {
												delete style['text-align']
											} else {
												style['text-align'] = 'center'
											}
										})
									}}
									value={style['text-align'] == 'center'}
								>
									<i className="fa fa-align-center fa-fw " />
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-align'] == 'right') {
												delete style['text-align']
											} else {
												style['text-align'] = 'right'
											}
										})
									}}
									value={style['text-align'] == 'right'}
								>
									<i className="fa fa-align-right fa-fw " />
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>wrap</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-crop']) {
												delete style['text-crop']
											} else {
												style['text-crop'] = true
												delete style['text-wrap']
												delete style['text-no-wrap']
											}
										})
									}}
									value={style['text-crop']}
								>
									crop
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-wrap']) {
												delete style['text-wrap']
											} else {
												style['text-wrap'] = true
												delete style['text-no-wrap']
												delete style['text-crop']
											}
										})
									}}
									value={style['text-wrap']}
								>
									wrap
								</OptionIcon>

								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-no-wrap']) {
												delete style['text-no-wrap']
											} else {
												style['text-no-wrap'] = true
												delete style['text-wrap']
												delete style['text-crop']
											}
										})
									}}
									value={style['text-no-wrap']}
								>
									no-wrap
								</OptionIcon>
							</OptionValue>
						</Option>

						<Option>
							<OptionTitle>transform</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-capitalize']) {
												delete style['text-capitalize']
											} else {
												style['text-capitalize'] = true
												delete style['text-uppercase']
											}
										})
									}}
									value={style['text-capitalize']}
								>
									capitalize
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-uppercase']) {
												delete style['text-uppercase']
											} else {
												style['text-uppercase'] = true
												delete style['text-capitalize']
											}
										})
									}}
									value={style['text-uppercase']}
								>
									uppercase
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>decoration</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-underline']) {
												delete style['text-underline']
											} else {
												style['text-underline'] = true
												delete style['text-no-underline']
											}
										})
									}}
									value={style['text-underline']}
								>
									underline
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['text-no-underline']) {
												delete style['text-no-underline']
											} else {
												style['text-no-underline'] = true
												delete style['text-underline']
											}
										})
									}}
									value={style['text-no-underline']}
								>
									no-underline
								</OptionIcon>
							</OptionValue>
						</Option>
					</OptionGroup>
					<OptionGroup title="Selection" closed>
						<Option>
							<OptionTitle>selection</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['selection-none']) {
												delete style['selection-none']
											} else {
												style['selection-none'] = true
												delete style['selection-text']
												delete style['selection-all']
											}
										})
									}}
									value={style['selection-none']}
								>
									none
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['selection-text']) {
												delete style['selection-text']
											} else {
												style['selection-text'] = true
												delete style['selection-none']
												delete style['selection-all']
											}
										})
									}}
									value={style['selection-text']}
								>
									text
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['selection-all']) {
												delete style['selection-all']
											} else {
												style['selection-all'] = true
												delete style['selection-none']
												delete style['selection-text']
											}
										})
									}}
									value={style['selection-all']}
								>
									all
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>cursor</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['cursor-hand']) {
												delete style['cursor-hand']
											} else {
												style['cursor-hand'] = true
												delete style['cursor-ignore']
												delete style['cursor-no-ignore']
											}
										})
									}}
									value={style['cursor-hand']}
								>
									hand
								</OptionIcon>

								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['cursor-ignore']) {
												delete style['cursor-ignore']
											} else {
												style['cursor-ignore'] = true
												delete style['cursor-hand']
												delete style['cursor-no-ignore']
											}
										})
									}}
									value={style['cursor-ignore']}
								>
									ignore
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['cursor-no-ignore']) {
												delete style['cursor-no-ignore']
											} else {
												style['cursor-no-ignore'] = true
												delete style['cursor-hand']
												delete style['cursor-ignore']
											}
										})
									}}
									value={style['cursor-no-ignore']}
								>
									no-ignore
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>color</OptionTitle>
							<OptionValue>
								<ColorPicker
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['selection-color'] = e || null
											if (style['selection-color'] === null) delete style['selection-color']
										})
									}}
									value={style['selection-color']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>background</OptionTitle>
							<OptionValue>
								<ColorPicker
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['selection-background'] = e || null
											if (style['selection-background'] === null)
												delete style['selection-background']
										})
									}}
									value={style['selection-background']}
								/>
							</OptionValue>
						</Option>
					</OptionGroup>
					<OptionGroup title="Scroll" closed>
						<Option>
							<OptionTitle>scroll</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.overflow) {
												delete style.overflow
											} else {
												style.overflow = true
												delete style['scroll']
												delete style['scroll-x']
												delete style['scroll-y']
											}
										})
									}}
									value={style.overflow}
								>
									none
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.scroll) {
												delete style.scroll
											} else {
												style.scroll = true
												delete style['overflow']
												delete style['scroll-x']
												delete style['scroll-y']
											}
										})
									}}
									value={style.scroll}
								>
									all
								</OptionIcon>

								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['scroll-x']) {
												delete style['scroll-x']
											} else {
												style['scroll-x'] = true
												delete style['overflow']
												delete style['scroll']
												delete style['scroll-y']
											}
										})
									}}
									value={style['scroll-x']}
								>
									x
								</OptionIcon>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['scroll-y']) {
												delete style['scroll-y']
											} else {
												style['scroll-y'] = true
												delete style['overflow']
												delete style['scroll']
												delete style['scroll-x']
											}
										})
									}}
									value={style['scroll-y']}
								>
									y
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>thin</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style['scroll-thin']) {
												delete style['scroll-thin']
											} else {
												style['scroll-thin'] = true
											}
										})
									}}
									value={style['scroll-thin']}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>track color</OptionTitle>
							<OptionValue>
								<ColorPicker
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['scroll-color'] = e || null
											if (style['scroll-color'] === null) delete style['scroll-color']
										})
									}}
									value={style['scroll-color']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>background</OptionTitle>
							<OptionValue>
								<ColorPicker
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['scroll-background'] = e || null
											if (style['scroll-background'] === null) delete style['scroll-background']
										})
									}}
									value={style['scroll-background']}
								/>
							</OptionValue>
						</Option>
					</OptionGroup>

					<OptionGroup title="Miscellaneous" closed>
						<Option>
							<OptionTitle>layer</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.layer) {
												delete style.layer
											} else {
												style.layer = true
											}
										})
									}}
									value={style.layer}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>z-index</OptionTitle>
							<OptionValue>
								<OptionInputSmall
									title="z"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['z'] = e || null
											if (style['z'] === null) delete style['z']
										})
									}}
									value={style['z']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>collapse</OptionTitle>
							<OptionValue>
								<OptionIcon
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											if (style.collapse) {
												delete style.collapse
											} else {
												style.collapse = true
											}
										})
									}}
									value={style.collapse}
								>
									<i className="fa fa-check fa-fw" />
								</OptionIcon>
							</OptionValue>
						</Option>
					</OptionGroup>

					<OptionGroup title="Colors" closed>
						<Option>
							<OptionTitle>text color</OptionTitle>
							<OptionValue>
								<ColorPicker
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['text-color'] = e || null
											if (style['text-color'] === null) delete style['text-color']
										})
									}}
									value={style['text-color']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>background color</OptionTitle>
							<OptionValue>
								<ColorPicker
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['background-color'] = e || null
											if (!style['background-color']) delete style['background-color']
										})
									}}
									value={style['background-color']}
								/>
							</OptionValue>
						</Option>
						<Option>
							<OptionTitle>background</OptionTitle>
							<OptionValue>
								<OptionInput
									title="background"
									onChange={e => {
										update_tree(item.id, function(item, style, parent) {
											style['background'] = e || null
											if (!style['background']) delete style['background']
										})
									}}
									value={style['background']}
								/>
							</OptionValue>
						</Option>
					</OptionGroup>
					<OptionGroup title="Output">
						<Option>
							<Box grow selection-text>
								{g.Active ? _generate_code_item_header(g.Active.item, 0).trim() : null}
							</Box>
						</Option>
						<Option>
							<Box
								element="textarea"
								grow
								value={g.content.trim()}
								height="4em"
								onChange={function() {}}
							/>
						</Option>
					</OptionGroup>
				</Box>
			)
		}
	}
}
