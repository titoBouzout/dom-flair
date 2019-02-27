// so we track changes and autoreload
var files = ['flexbox.jsx', 'flexbox.html', 'base.css']

function append_style(styles) {
	var sheet = document.createElement('style')
	sheet.appendChild(document.createTextNode(''))
	document.head.appendChild(sheet)

	sheet.appendChild(document.createTextNode(styles))
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
	for (var id in props) {
		switch (id) {
			// flex stuff, the difficult thing!
			case 'row':
				_props.style.display = 'flex'
				_props.style.flexDirection = 'row'
				break
			case 'col':
				_props.style.display = 'flex'
				_props.style.flexDirection = 'column'
				break
			case 'grow':
				_props.style.display = 'flex'
				_props.style.flex = '1'
				append_style('#' + _props.id + ' > *{ align-self:start;}')
				break
			case 'basis':
				_props.style.flexBasis = props[id]
				break
			case 'wrap':
				_props.style.display = 'flex'
				_props.style.flexWrap = 'wrap'
				break

			// scroll
			case 'scroll-y':
				_props.style.overflowY = 'auto'
				_props.style.minWidth = '0'
				break
			case 'scroll-x':
				_props.style.overflowX = 'auto'
				_props.style.minHeight = '0'
				break

			// display
			case 'inline':
				_props.style.display = 'inline'
				break

			// width/height
			case 'width':
				_props.style.width = props[id]
				break
			case 'height':
				_props.style.height = props[id]
				break

			// a random background color
			case 'background':
				_props.style.background = random_color()
				_props.style.border = '2px solid ' + random_color()
				break

			// alignment
			// justify content = direction axis
			// align items = cross axis
			case 'left':
				if (props.col) {
					_props.style.alignItems = 'flex-start'
				} else {
					_props.style.justifyContent = 'flex-start'
				}
				break

			case 'right':
				if (props.col) {
					_props.style.alignItems = 'flex-end'
				} else {
					_props.style.justifyContent = 'flex-end'
				}
				break

			case 'top':
				if (props.col) {
					_props.style.justifyContent = 'flex-start'
				} else {
					_props.style.alignItems = 'flex-start'
				}
				break

			case 'bottom':
				if (props.col) {
					_props.style.justifyContent = 'flex-end'
				} else {
					_props.style.alignItems = 'flex-end'
				}
				break

			case 'horizontal':
				if (props.col) {
					_props.style.alignItems = 'center'
				} else {
					_props.style.justifyContent = 'center'
				}
				break
			case 'vertical':
				if (props.col) {
					_props.style.justifyContent = 'center'
				} else {
					_props.style.alignItems = 'center'
				}
				break
			// both horizontal and vertical
			case 'center':
				_props.style.justifyContent = 'center'
				_props.style.alignItems = 'center'
				break
			case 'spaced':
				_props.style.justifyContent = 'space-around'
				_props.style.alignItems = 'center'
				break

			case 'crop':
				// : 1;
				_props.style.textOverflow = 'ellipsis'
				_props.style.whiteSpace = 'nowrap'
				_props.style.overflow = 'hidden'
				_props.style.minWidth = '0'
				_props.style.minHeight = '0'
				//_props.style.flexShrink = '1'
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
				<Box col background basis="110px" data-column-left-sidebar>
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
				<Box col background basis="15%" data-column-right-sidebar>
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
