# Crippling Sorrow Styling

The goal of this project is to have just one React "meta component" named `Box`. This is to solve any or most `html` layout issues in intuitive ways without having to think about CSS. For example `<Box col grow></Box>`. That's it.

It could also help with trivial CSS that can be just named in an attribute, For example `<Box capitalize></Box>` to capitalize the `Box` contents. It could also be used similar to styled-components.

You must include `style.js` like in `<script src='style.js'></script>`. Please note React is required.

## Examples

### The "Holy Grail Layout":

Sticky footer

```jsx
<Box col grow>
	<Box>header</Box>
	<Box grow>content</Box>
	<Box>footer</Box>
</Box>
```

### Elaborate Example:

Has two sidebars, a toolbar, a footer, and grows in the middle content:

```jsx
<Box grow>
	<Box col grow max-width="210px" horizontal>
		left sidebar
	</Box>
	<Box col grow>
		<Box row width="100%" right>
			toolbar
		</Box>
		<Box row grow center>
			content
		</Box>
		<Box row width="100%" left>
			footer
		</Box>
	</Box>
	<Box col grow max-width="210px" center>
		right sidebar
	</Box>
</Box>
```

### Full Working Example:

Notice `html` and `body` should be full width/height for the flex elements to work.

Also the element you mount to should be `display:flex;flex:1;`

```html
<!DOCTYPE html>
<html>
<head>
	<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
	<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
	<script crossorigin src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
	<!-- you should include this -->
	<script src="style.js"></script>

	<style type="text/css">
		html, body, #root {
			margin: 0;
			width: 100%;
			height: 100%;
		}

		#root {
			display: flex;
			flex: 1;
		}

		* {
			box-sizing: border-box;
		}
	</style>
</head>
<body>
	<div id="root"></div>
	<script type="text/jsx">
		function Component(){
			return (
				<Box grow>
					<Box col grow max-width="210px" horizontal>
						left sidebar
					</Box>
					<Box col grow>
						<Box row width="100%" right>
							toolbar
						</Box>
						<Box row grow center>
							content
						</Box>
						<Box row width="100%" left>
							footer
						</Box>
					</Box>
					<Box col grow max-width="210px" vertical>
						right sidebar
					</Box>
				</Box>
			)
		}

		ReactDOM.render(
			React.createElement(Component),
			document.querySelector('#root')
		)
	</script>
</body>
</html>

```

## Caveats / Surprises

1. Rows will not take the full width unless you add to them width="100%"
2. You need to explicitly tell how stuff is aligned. (this is a feature)
3. It does not do any kind of prefixing.
4. If you use interpolation, we will just use `string.raw[0]` without doing any sort of processing.
5. You are responsible of defining `html`, `body` or `body > div` so the styles of this library work properly. (example, if you use `<Box grow/>` and it does not work then maybe the parent is preventing the Box from growing. See section "Full Working Example"

## Attributes supported by `Box`

The element is `<Box></Box>`, and you can just add attributes to it without any values. Some attributes like `width` will require a value. If a value is not required, then it'll be ignored.

### Direction

| attribute | description                        | status      |
| --------- | ---------------------------------- | ----------- |
| `row`     | children will display as a row     | implemented |
| `col`     | children will display as a column  | implemented |
| `wrap`    | wraps the children as in flex-wrap, | implemented (this maybe has problems with box-sizing)|
| `nowrap`  | disables wrapping                  | implemented |

### Size

The size of the `Box` and NOT the size of the children.

| attribute | description                                           | status                                                                          |
| --------- | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| `grow`    | grow `self` as much as it can without growing the children                         | implemented                                                                     |
| `basis`   | sets the flex-basis value                             | buggy, we're forcing `align-self:stretch;` to `grow`, so flex-basis is ignored. |
| `width`   | sets the width value(if empty defaults to 100%)       | implemented                                                                     |
| `min-width`   | sets the min-width value (if empty defaults to 100%)  | implemented                                                                     |
| `max-width`   | sets the max-width value (if empty defaults to 100%)  | implemented                                                                     |
| `w`       | sets the width value(if empty defaults to 100%)       | implemented                                                                     |
| `min-w`   | sets the min-width value (if empty defaults to 100%)  | implemented                                                                     |
| `max-w`   | sets the max-width value (if empty defaults to 100%)  | implemented                                                                     |
| `height`  | sets the height value (if empty defaults to 100%)     | implemented                                                                     |
| `min-height`   | sets the min-height value (if empty defaults to 100%) | implemented                                                                     |
| `max-height`   | sets the max-height value (if empty defaults to 100%) | implemented                                                                     |
| `h`       | sets the height value (if empty defaults to 100%)     | implemented                                                                     |
| `min-h`   | sets the min-height value (if empty defaults to 100%) | implemented                                                                     |
| `max-h`   | sets the max-height value (if empty defaults to 100%) | implemented                                                                     |

### Children Alignment

This is the alignment of the children, NOT the alignment of the content of these children. Example: You can display a `div` aligned to the left, but the text on it aligned to the `right`. Well, in here we only control the `div` itself and not the `div` content.

| attribute    | description                                        | status      |
| ------------ | -------------------------------------------------- | ----------- |
| `left`       | aligns to left                                     | implemented |
| `top`        | aligns to top                                      | implemented |
| `right`      | aligns to right                                    | implemented |
| `bottom`     | aligns to bottom                                   | implemented |
| `horizontal` | aligns to the center horizontally                  | implemented |
| `vertical`   | aligns to the center vertically                    | implemented |
| `center`     | aligns to center, both horizontally and vertically | implemented |

### Space Between Children Elements

| attribute       | description   | status                  |
| --------------- | ------------- | ----------------------- |
| `space-around`  | space-around  | implemented      |
| `space-around-horizontal`  | space-around  | semi implemented (does not work in cols)       |
| `space-around-vertical`  | space-around  | semi implemented (does not work in cols)       |
| `space-between` | space-between | implemented        |
| `space-between-horizontal` | space-between | semi implemented (does not work in cols)       |
| `space-between-vertical` | space-between | semi implemented (does not work in cols)       |
| `space-evenly`  | space-evenly  | implemented      |
| `space-evenly-horizontal`  | space-evenly  | semi implemented (does not work in cols)       |
| `space-evenly-vertical`  | space-evenly  | semi implemented (does not work in cols)       |
| `stretch`       | stretch       | implemented, not tested |

#### Bugs

- `space-around`, `space-between` and `space-evenly` use `align-content: initial;` to workaround "Can't scroll to top of flex item that is overflowing container"
- "safe center" values looks like it does not work correctly in browsers....

### Text

Useful text stuff.

| attribute      | description                             | status      |
| -------------- | --------------------------------------- | ----------- |
| `text-crop`    | crops the text (ellipsis will only be shown if the container in not display:flex aka not row/col/grow, if you want to show ellipsis in a flex container then wrap it like `<Box row><Box text-crop>The..</Box></Box>`)         | implemented |
| `text-nowrap`  | nowrap the text if it overflows         | implemented |
| `text-wrap`    | wrap the text if it overflows           | implemented |
| `small`        | font size small                         | implemented |
| `bold`         | bold font                               | implemented |
| `no-bold`      | no bold font                            | implemented |
| `underline`    | underline                               | implemented |
| `no-underline` | do not underline                        | implemented |
| `uppercase`    | uppercase                               | implemented |
| `capitalize`   | capitalize                              | implemented |
| `size`         | font size                               | implemented |
| `text`         | sets line-height:1.4;                   | implemented |
| `align`        | text-align could be left, center, right | implemented |

### Scroll

| attribute  | description                                             | status      |
| ---------- | ------------------------------------------------------- | ----------- |
| `scroll`   | scrolls both vertically and horizontally when overflows | implemented |
| `scroll-x` | scrolls horizontally when overflows                     | implemented |
| `scroll-y` | scrolls vertically when overflows                       | implemented |

### Cursor

| attribute   | description            | status      |
| ----------- | ---------------------- | ----------- |
| `hand`      | cursor pointer         | implemented |
| `ignore`    | ignore events          | implemented |
| `no-select` | prevent text selection | implemented |

### Padding / Margin / Border

| attribute | description                               | status      |
| --------- | ----------------------------------------- | ----------- |
| `padding` | padding                                   | implemented |
| `p`       | padding                                   | implemented |
| `pb`      | padding bottom                            | implemented |
| `pl`      | padding left                              | implemented |
| `pr`      | padding right                             | implemented |
| `pt`      | padding top                               | implemented |
| `margin`  | margin                                    | implemented |
| `m`       | margin                                    | implemented |
| `mb`      | margin bottom                             | implemented |
| `ml`      | margin left                               | implemented |
| `mr`      | margin right                              | implemented |
| `mt`      | margin top                                | implemented |
| `border`  | border                                    | implemented |
| `b`       | border                                    | implemented |
| `bb`      | border bottom                             | implemented |
| `bl`      | border left                               | implemented |
| `br`      | border right                              | implemented |
| `bt`      | border top                                | implemented |
| `radius`  | border-radius (if empty defaults to 100%) | implemented |

### CSS

Attributes to add custom CSS/classNames. Priority, the ones on top overwrite the ones on bottom:

1. `css_parent` overwrites:
2. `define_attribute_high_priority` functions, overwrites:
3. `<Box style={{background:'red';}}/>` overwrites:
4. `<Box css="background:red;"/>` overwrites:
5. `<Box grow/>` overwrites:
6. `css('background:red;');`
7. `className` is unknown if overwrites or not because depends were you include style sheet.

Please Note: if you set an attribute as `!important` same thing order will apply but `!important` values will still be important.

| attribute      | description                                                                                         | status          |
| -------------- | --------------------------------------------------------------------------------------------------- | --------------- |
| `style`        | React standard object for styles. Please note these get added as classes, not as a style attribute. | implemented     |
| `className`    | React standard string with classNames                                                               | implemented     |
| `css`          | string with regular css properties                                                                  | implemented     |
| `css_children` | string with regular css properties, to be applied to children                                       | not implemented |
| `css_parent`   | string with regular css properties, to be applied to the parent. This is :parent selector           | implemented not tested    |

### Random Helpers As We See These Fit

| attribute      | description                                                         | status      |
| -------------- | ------------------------------------------------------------------- | ----------- |
| `block`        | display block                                                       | implemented |
| `inline`       | display inline                                                      | implemented |
| `inline-block` | display inline-block                                                | implemented |
| `relative`     | position relative                                                   | implemented |
| `absolute`     | position absolute                                                   | implemented |
| `fixed`        | position fixed top 0 left 0                                         | implemented |
| `full`         | full width and height with overflow hidden                          | implemented |
| `overflow`     | overflow hidden                                                     | implemented |
| `layer`        | forces the browser to create a layer using transform:translateZ(0); | implemented |
| `z`            | z-index                                                             | implemented |

### Core

| attribute | description                                                                                                                                                                            | status      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `element` | a string telling what kind of element should the Box should be. By default is a `div`, but if you do `<Box element="span"/>`, it should just work and use a `span` instead of a `div`. | implemented |

## API

### Globals

Including this creates four globals:

- `Style` the class itself.
- `style` the class instance.
- `Box` the component `Box`
- `css` a component factory

### Valid use cases for `Box` component

```html

<Box></Box>

<Box css="background:red"></Box>

<Box css=`
	class:hover{
		background:red;
	}
	class >a{
		background:green
	};
`></Box>

<Box style={{background:'red'}}></Box>

```

### Invalid use cases for `Box` component. It Will Not Work !

These attributes cannot have a class.

```html
<Box css_parent="class{background:red;}"></Box>
<Box css_children="class{background:red}"></Box>
```

### Valid use cases for `css` component factory

```javascript
// this is basically the same as Box
var Component = css()

// defining a default css for the component
var Component = css('background:red;')

// class gets automatically replaced for a unique name
var Component = css('class{background:red;}')

// this is why class is handy
var Component = css('class:hover{background:red;}')

// as many classes as you want
var Component = css('class{color:red;}class>a{color:blue;}')

// the default element is a div, you can change it
var Component = css('background:red;', 'span')

// using other components in a simple way
function Component_NOTICE_ME(props) {
	// here className was automatically created
	return (
		<div className={props.className}>
			<a href="index.html">{props.children}</a>
		</div>
	)
}
var Red = css('background:red', Something_NOTICE_ME)
var Blue = css('background:blue', Something_NOTICE_ME)


// Then you just do
// <Red>the red link!</Red>
// <Red padding="5px">the red link!</Red>
// <Blue>the blue link!</Blue>

// sort styled-components
var Button = css(
	`
	display: inline-block;
	border-radius: 3px;
`,
	'button'
)

// I believe interpolation does not work. IDK
var Button = css`
	display: inline-block;
	border-radius: 3px;
	border: 2px solid white;
`
```

### Extending. You can define new static and dynamic attributes for `Box`

#### Static argument

Lets say we add a new static attribute named fancy_margin

```javascript
style.define_attribute('fancy_margin', 'margin:0 auto;')

// You now can use as <Box fancy_margin></Box>

```

Sometimes the attributes you add get overwritten by something else. In that case you can assign to the attributes a higher priority by defining it as high priority instead.



```javascript
style.define_attribute_high_priority('fancy_margin', 'margin:0 auto;')

// You now can use as <Box fancy_margin></Box>

```

#### Dynamic argument

Lets say we add a new dynamic attribute named random_margin. This is a function that gets called.

```javascript
style.define_dynamic_attribute('random_margin', function(value, props) {
	return 'margin:' + ((Math.random() * 10) | 0) + 'px;padding:5px;'
})

// You then can use as <Box random_margin></Box>

```

The custom function will receive two arguments. It should return a string with css properties, NOT classes.

The arguments:

##### `value`

Is the value of the attribute. If you do `<Box random_margin="false"></Box>` Then the value will be "false"

#### `props`

The react props object. This is handy so you can look up other attributes.

`if(props.margin) { /* as has a defined margin do not add a random margin! */ }`

You can also define a high priority dynamic attribute.

```javascript

// defining a dynamic attribute with high priority
style.define_dynamic_attribute_high_priority('random_margin', function(value, props) {
	// we avoid adding a random margin to something that already has a margin defined
	if (props.margin)
		return ''
	// yeah!
	return 'margin:' + ((Math.random() * 10) | 0) + 'px;'
})

```

#### How To Debug

As we are going to create unique classes, we are going to reuse everywhere any class that has the same properties. So if you edit the properties of any class, you're basically editing everything globally. You should test/debug by editing `element.style` in the developer console and not the classes.

To set debug to true do `style.debug = true`

- This will print the attributes in the elements as `data-*`
- Will turn off memoize for some functions

### Validating

It does not pretend to validate everything, just the annoying things that could cause problems.

It has defined a function to validate complete classes attached to an element together, but currently does not validate anything.

Outdated stuff:

It displays an error message if debug is on when:

1. width or height is used with also padding or margin or border without using box-sizing

## Features

- easy to think about layouts
- some handy default attributes
- easy to use mobile breakpoints
- deduplicates css
- is very efficient

## TODO

- Maybe enforce style coupling: if an animation with transform is used, then will-change: transform; should be there
- Maybe change pixels to em on the fly
- Document mobile features. I still didn't use, so no documentation.
- define an expiration for the memoize functions.

## Authors

- Tito Bouzout https://github.com/titoBouzout
- Kilo https://github.com/kspade