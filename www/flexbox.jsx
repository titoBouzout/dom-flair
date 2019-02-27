// so we track changes and autoreload
var files = ['flexbox.jsx', 'flexbox.html', 'base.css']

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

	for (var id in props) {
		switch (id) {
			// flex stuff, the difficult thing!
			case 'row':
				style += 'display:flex;'
				style += 'flex-direction:row;'
				//style += 'flex:auto;'
				style += 'width:100%;'
				_props['data-' + id] = props[id]

				break
			case 'col':
				style += 'display:flex;'
				style += 'flex-direction:column;'
				//style += 'height:100%;'

				_props['data-' + id] = props[id]
				break
			case 'grow':
				style += 'display:flex;'
				style += 'flex:1;'
				style += 'align-self:stretch;'
				//style += 'width:auto;'

				//style += 'height:auto%;'

				style_children += 'align-self:start;'
				_props['data-' + id] = props[id]
				break
			case 'basis':
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

			// alignment
			// justify content = direction axis
			// align items = cross axis
			case 'left':
				if (props.col) {
					style += 'align-items:flex-start;'
				} else {
					style += 'justify-content:flex-start;'
				}
				_props['data-' + id] = props[id]
				break

			case 'right':
				if (props.col) {
					style += 'align-items:flex-end;'
				} else {
					style += 'justify-content:flex-end;'
				}
				_props['data-' + id] = props[id]
				break

			case 'top':
				if (props.col) {
					style += 'justify-content:flex-start;'
				} else {
					style += 'align-items:flex-start;'
				}
				_props['data-' + id] = props[id]
				break

			case 'bottom':
				if (props.col) {
					style += 'justify-content:flex-end;'
				} else {
					style += 'align-items:flex-end;'
				}
				_props['data-' + id] = props[id]
				break

			case 'horizontal':
				if (props.col) {
					style += 'align-items:center;'
				} else {
					style += 'justify-content:center;'
				}
				_props['data-' + id] = props[id]
				break
			case 'vertical':
				if (props.col) {
					style += 'justify-content:center;'
				} else {
					style += 'align-items:center;'
				}
				_props['data-' + id] = props[id]
				break
			// both horizontal and vertical
			case 'center':
				style += 'justify-content:center;'
				style += 'align-items:center;'
				_props['data-' + id] = props[id]
				break
			case 'spaced':
				style += 'justify-content:space-around;'
				style += 'align-items:center;'
				_props['data-' + id] = props[id]
				break

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
				<Box col grow background max-width="110px" data-column-left-sidebar>
					<Box>
						<a href="#">
							<Box>
								<img src="images/profile.png" />
							</Box>
						</a>
					</Box>
					<Box col background>
						{repeat(3).map(function(k) {
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
					<Box col wrap grow scroll-y>
						{repeat(3).map(function(k) {
							return (
								<img
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
					<Box row background data-toolbar>
						<Box title="Go Back">
							<img src="images/icon.png" />
						</Box>
						<Box data-toolbar-title>
							<Box inline>
								<Box inline>
									<img src="images/icon.png" />
								</Box>
								<b>LALA.UY</b>
							</Box>
							<Box inline>· </Box>
						</Box>
						<Box grow data-toolbar-description>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum is simply dummy text of the printing and
							typesetting industry.
						</Box>

						<Box>right content for room toolbar </Box>
					</Box>
					<Box background grow wrap spaced scroll-y data-content>
						{repeat(20).map(function(k) {
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
					</Box>

					<Box row background data-footer>
						<Box>
							Guest 922 <Box inline>— </Box>
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
					<Box>
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
