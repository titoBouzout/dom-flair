// helper to repeat an element N times
function repeat(n) {
	return Array.apply(null, { length: n }).map(Number.call, Number)
}
// just a random color to help us see stuff

var color = 0
function random_color() {
	function random(bottom, top) {
		return Math.floor(Math.random() * (1 + top - bottom)) + bottom
	}
	function color2hex(n) {
		n = parseInt(n, 10)
		if (isNaN(n)) return '00'
		n = Math.max(0, Math.min(n, 255))
		return (
			'0123456789ABCDEF'.charAt((n - (n % 16)) / 16) +
			'0123456789ABCDEF'.charAt(n % 16)
		)
	}
	color += 30
	if (color > 255) color = 0
	var red = (color + 0) >> 1
	var green = (color + 100) >> 1
	var blue = (color + 200) >> 1

	return '#' + color2hex(red) + '' + color2hex(green) + '' + color2hex(blue)
}

;(function() {
	var cache = {}
	var reload = function() {
		clearTimeout(this.refresh)
		this.refresh = setTimeout(function() {
			window.location.reload()
		}, 50)
	}
	setInterval(function() {
		for (let file of files) {
			var xhttp = new XMLHttpRequest()
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					if (!cache[file]) {
						cache[file] = this.responseText
					} else if (cache[file] != this.responseText) {
						cache[file] = this.responseText
						reload()
					}
				}
			}
			xhttp.open('GET', file)
			xhttp.send()
		}
	}, 500)
})()
