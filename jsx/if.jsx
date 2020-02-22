function IF(props) {
	if (props.condition) {
		return props.children || null
	} else {
		return null
	}
}
