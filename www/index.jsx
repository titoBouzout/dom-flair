style.css_property_fn.background = function(value, props, style_hp) {
	return 'background:' + random_color() + ';'
}

const PriorityTest = css('background:yellow;')

class Component extends React.Component {
	render() {
		return (
			<Box grow background data-layout>
				<Box col grow background max-w="210px" data-column-left-sidebar>
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
					<Box col wrap grow scroll-y right>
						{repeat(5).map(function(k) {
							return (
								<Box
									element="img"
									w="2em"
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
					<Box row background data-toolbar w="100%">
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
						<Box grow text-crop data-toolbar-description>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum is simply dummy text of the printing and
							typesetting industry.
						</Box>

						<PriorityTest
							css="background:blue;"
							className="orange"
							style={{ background: 'red' }}
						>
							css priority test
						</PriorityTest>
					</Box>
					<Box background col grow wrap scroll-y data-content space-evenly>
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
											w="25%"
											h="10%"
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
												w="25%"
												h="10%"
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

					<Box row nowrap background data-footer w="100%">
						<Box row>
							Guest 922
							<Box inline row>
								—{' '}
							</Box>
						</Box>
						<Box grow />
						<Box row text-crop>
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
				<Box col grow background max-w="15%" data-column-right-sidebar>
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
					<Box w="100%">
						<label>
							<Box>
								<Box
									element="input"
									spellCheck="false"
									autoComplete="off"
									placeholder="Press TAB or click to chat"
									type="text"
									w="100%"
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
