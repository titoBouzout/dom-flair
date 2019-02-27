// so we track changes and autoreload
var files = ['flexbox.jsx', 'flexbox.html', 'flexbox.css']

var sheet = document.createElement('style')
sheet.appendChild(document.createTextNode(''))
document.head.appendChild(sheet)
function append_style(style) {
	sheet.appendChild(document.createTextNode(style))
}

var element_id = 0

// returns props for react with the style element modified
function props_to_style(props) {
	element_id += 1
	var _props = {
		id: 'c' + element_id,
		style: props.style || {},
		className: props.className || '',
	}
	var style = ''
	var style_children = ''
	var style_after = ''
	var style_after_children = ''

	for (var id in props) {
		if (id.indexOf('test') != -1) {
			id = props[id]
		}
		switch (id) {
			// main axis
			// justify-content space between items
			// justify-items for the default justify-self
			// justify-self alignment

			// cross axis
			// align-content space between items
			// align-items for the default align-self
			// align-self alignment

			case 'row':
				style += 'display:flex;'
				style += 'flex-direction:row;'
				style += 'min-height:0;'
				style += 'min-width:0;'

				style += 'align-content:flex-start;'
				style += 'justify-content:flex-start;'
				style += 'justify-items:flex-start;'
				style += 'align-items:flex-start;'

				_props['data-' + id] = props[id]

				break
			case 'col':
				style += 'display:flex;'
				style += 'flex-direction:column;'
				style += 'min-height:0;'
				style += 'min-width:0;'

				style += 'align-content:flex-start;'
				style += 'justify-content:flex-start;'
				style += 'justify-items:flex-start;'
				style += 'align-items:flex-start;'

				_props['data-' + id] = props[id]
				break
			case 'grow':
				style += 'display:flex;'
				style += 'flex:1;'
				style += 'align-self:stretch;'
				style += 'min-height:0;'
				style += 'min-width:0;'

				style += 'align-content:flex-start;'
				style += 'justify-content:flex-start;'
				style += 'justify-items:flex-start;'
				style += 'align-items:flex-start;'

				_props['data-' + id] = props[id]
				break
			case 'basis':
				style += 'display:flex;'
				style += 'flex-basis:' + props[id] + ';'
				_props['data-' + id] = props[id]
				break
			case 'wrap':
				style += 'display:flex;'
				style += 'flex-wrap:wrap;'
				_props['data-' + id] = props[id]
				break

			// scroll
			case 'scroll-y':
				style += 'overflow-Y:auto;'
				style += 'min-height:0;'

				_props['data-' + id] = props[id]
				break
			case 'scroll-x':
				style += 'overflow-x:auto;'
				style += 'min-width:0;'

				_props['data-' + id] = props[id]
				break

			// display
			case 'inline':
				style += 'display:inline;'

				_props['data-' + id] = props[id]
				break

			// width/height
			case 'width':
				style += 'width:' + props[id] + ';'
				_props['data-' + id] = props[id]
				break
			case 'height':
				style += 'height:' + props[id] + ';'
				_props['data-' + id] = props[id]
				break
			case 'max-width':
				style += 'max-width:' + props[id] + ';'
				_props['data-' + id] = props[id]
				break
			case 'max-height':
				style += 'max-height:' + props[id] + ';'
				_props['data-' + id] = props[id]
				break

			// a random background color
			case 'background':
				style += 'background:' + random_color() + ';'
				style += 'border:2px solid ' + random_color() + ';'
				_props['data-' + id] = props[id]
				break

			// main axis
			// justify-content space between items
			// justify-items for the default justify-self
			// justify-self alignment

			// cross axis
			// align-content space between items
			// align-items for the default align-self
			// align-self alignment
			case 'left':
				style += 'display:flex;'
				if (props.col) {
					// the default not tested
					style_after += 'align-content:flex-start;'
					style_after += 'align-items:flex-start;'
				} else {
					// the default not tested
					style_after += 'justify-content:flex-start;'
					style_after += 'justify-items:flex-start;'
				}
				_props['data-' + id] = props[id]
				break

			case 'top':
				style += 'display:flex;'
				if (props.col) {
					// the default not tested
					style_after += 'justify-content:flex-start;'
					style_after += 'justify-items:flex-start;'
				} else {
					// the default not tested
					style_after += 'align-content:flex-start;'
					style_after += 'align-items:flex-start;'
				}
				_props['data-' + id] = props[id]
				break

			case 'right':
				style += 'display:flex;'
				if (props.col) {
					style_after += 'align-content:flex-end;'
					style_after += 'align-items:flex-end;'
				} else {
					style_after += 'justify-content:flex-end;'
					style_after += 'justify-items:flex-end;'
				}
				_props['data-' + id] = props[id]
				break

			case 'bottom':
				style += 'display:flex;'
				if (props.col) {
					style_after += 'justify-content:flex-end;'
					style_after += 'justify-items:flex-end;'
				} else {
					style_after += 'align-content:flex-end;'
					style_after += 'align-items:flex-end;'
				}
				_props['data-' + id] = props[id]
				break

			case 'horizontal':
				style += 'display:flex;'
				if (props.col) {
					style_after += 'align-content:center;'
					style_after += 'align-items:center;'
				} else {
					style_after += 'justify-content:center;'
					style_after += 'justify-items:center;'
				}
				_props['data-' + id] = props[id]
				break
			case 'vertical':
				style += 'display:flex;'
				if (props.col) {
					style_after += 'justify-content:center;'
					style_after += 'justify-items:center;'
				} else {
					style_after += 'align-content:center;'
					style_after += 'align-items:center;'
				}
				_props['data-' + id] = props[id]
				break
			// both horizontal and vertical
			case 'center':
				style += 'display:flex;'
				style_after += 'justify-content:center;'
				style_after += 'align-content:center;'
				style_after += 'justify-items:center;'
				style_after += 'align-items:center;'
				_props['data-' + id] = props[id]
				break
			case 'space-around':
				style += 'display:flex;'
				style_after += 'justify-content:space-around;'
				style_after += 'align-content:space-around;'
				style_after += 'justify-items:center;'
				style_after += 'align-items:center;'
				_props['data-' + id] = props[id]
				break
			case 'space-between':
				style += 'display:flex;'
				style_after += 'justify-content:space-between;'
				style_after += 'align-content:space-between;'
				style_after += 'justify-items:center;'
				style_after += 'align-items:center;'
				_props['data-' + id] = props[id]
				break
			case 'space-evenly':
				style += 'display:flex;'
				style_after += 'justify-content:space-evenly;'
				style_after += 'align-content:space-evenly;'
				style_after += 'justify-items:center;'
				style_after += 'align-items:center;'
				_props['data-' + id] = props[id]
				break
			case 'stretch':
				style += 'display:flex;'
				style_after += 'justify-content:stretch;'
				style_after += 'align-content:stretch;'
				style_after += 'justify-items:center;'
				style_after += 'align-items:center;'
				_props['data-' + id] = props[id]
				break

			case 'nowrap':
				style += 'white-space:nowrap;'

			case 'crop':
				style += 'text-overflow:ellipsis;'
				style += 'white-space:nowrap;'
				style += 'overflow:hidden;'
				style += 'min-width:0;'
				style += 'min-height:0;'
				// style += 'flexShrink:1;'

				_props['data-' + id] = props[id]
				break

			// already copied at the top of the function
			case 'style':
			case 'className':
				break
			// internal to the box element
			case 'element':
				break
			default:
				_props[id] = props[id]
		}
	}

	if (style.trim() != '') {
		append_style('#' + _props.id + ' { ' + style + '}')
	}
	if (style_children.trim() != '') {
		append_style('#' + _props.id + ' > *{ ' + style_children + '}')
	}

	if (style_after.trim() != '') {
		append_style('#' + _props.id + ' { ' + style_after + '}')
	}
	if (style_after_children.trim() != '') {
		append_style('#' + _props.id + ' > *{ ' + style_after_children + '}')
	}

	return _props
}

// the meta element that based on props should just work
function Box(props) {
	return React.createElement(props.element || 'div', props_to_style(props))
}

// just a component so is easier to edit programmatically
// data-* attributes are there so we recognize the element when inspecting

class Component extends React.Component {
	render() {
		return (
			<Box grow background data-layout>
				<Box col grow background max-width="210px" data-column-left-sidebar>
					<Box>
						<a href="#">
							<Box>
								<img src="images/profile.png" />
							</Box>
						</a>
					</Box>
					<Box col background>
						{repeat(6).map(function(k) {
							return (
								<a key={k} href="#">
									<Box inline>
										<img src="images/icon.png" />
									</Box>
									LINK
								</a>
							)
						})}
					</Box>
					<Box row wrap grow scroll-y right>
						{repeat(5).map(function(k) {
							return (
								<Box
									element="img"
									width="2em"
									key={k}
									src="images/profile.png"
									style={{ border: '2px solid lime' }}
								/>
							)
						})}
					</Box>
					<Box data-user-main-pic>
						<img src="images/profile.png" />
					</Box>
				</Box>
				<Box grow col background data-column-middle>
					<Box row background data-toolbar width="100%">
						<Box row title="Go Back">
							<img src="images/icon.png" />
						</Box>
						<Box row data-toolbar-title>
							<Box inline>
								<Box inline>
									<img src="images/icon.png" />
								</Box>
								<b>LALA.UY</b>
							</Box>
							<Box inline>· </Box>
						</Box>
						<Box grow crop data-toolbar-description>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum is simply dummy text of the printing and
							typesetting industry.
						</Box>

						<Box>right content for room toolbar </Box>
					</Box>
					<Box background col grow wrap scroll-y data-content stretch>
						{repeat(5).map(function(k) {
							return (
								<Box key={k}>
									<Box>
										<img src="images/profile.png" width="221" height="221" />
									</Box>
									<Box>Guest 917 </Box>
									<Box> Level 0 </Box>
									<Box> I ♥ lala </Box>
								</Box>
							)
						})}

						{/* test alignment*/ false
							? ['left', 'right', 'top', 'bottom'].map(function(align) {
									return (
										<Box
											col
											key={align}
											width="25%"
											height="10%"
											background
											test_align={align}
										>
											{align}
										</Box>
									)
							  })
							: null}

						{/* test alignment*/ false
							? ['left', 'right', 'horizontal'].map(function(align1) {
									return ['top', 'bottom', 'vertical'].map(function(align2) {
										if (align1 == align2) return null
										return (
											<Box
												col
												key={align2}
												width="25%"
												height="10%"
												background
												test_align1={align1}
												test_align2={align2}
											>
												{align1} {align2}
											</Box>
										)
									})
							  })
							: null}
					</Box>

					<Box row nowrap background data-footer width="100%">
						<Box row>
							Guest 922
							<Box inline row>
								—{' '}
							</Box>
						</Box>
						<Box grow />
						<Box row crop>
							Users 1<Box>· </Box>Rooms 4<Box>· </Box>v4.0226,1509<Box>| </Box>
							<Box>
								<img src="images/icon.png" />
							</Box>
							<Box> 2049 </Box>
						</Box>
						<Box row>
							lalal.uy
							<Box>
								<img src="images/icon.png" />
							</Box>
						</Box>
					</Box>
				</Box>
				<Box col grow background max-width="15%" data-column-right-sidebar>
					<Box scroll-y>
						{repeat(10).map(function(k) {
							return (
								<Box key={k}>
									Lorem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the industry's
									standard dummy text ever since the 1500s, .......
									<Box>
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum has been the industry's
										standard dummy text ever since the 1500s, .......{' '}
									</Box>
									<Box>
										ALorem Ipsum is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum has been the industry's
										standard dummy text ever since the 1500s, .......{' '}
									</Box>
								</Box>
							)
						})}
					</Box>
					<Box width="100%">
						<label>
							<Box>
								<Box
									element="input"
									spellCheck="false"
									autoComplete="off"
									placeholder="Press TAB or click to chat"
									type="text"
									width="100%"
								/>
							</Box>
						</label>
					</Box>
				</Box>
			</Box>
		)
	}
}

// mount it

ReactDOM.render(React.createElement(Component), document.querySelector('#root'))
