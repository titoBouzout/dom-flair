# Crippling Sorrow Styling

The goal of this project is to have just one React "meta component" named `Box`. This is to solve any or most `html` layout issues in intuitive ways without having to think about CSS. For example `<Box col grow></Box>`. That's it.

It could also help with trivial CSS that can be just named in an attribute, For example `<Box capitalize></Box>` to capitalize the `Box` contents. It could also be used similar to styled-components.

## Installation

Please note React is required.

### ES module

`npm install crippling-sorrow-styling`

Import it where you gonna use is

`import { css, Box } from 'crippling-sorrow-styling'`

The element you mount to should be `display:flex;flex:1;`

### Regular js file

`<script crossorigin src="https://cdn.jsdelivr.net/gh/titoBouzout/crippling-sorrow-styling/style.js"></script>`.

The element you mount to should be `display:flex;flex:1;`

## Examples

You may try the codepen directly https://codepen.io/anon/pen/ZgabXx

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
		<Box row width right>
			toolbar
		</Box>
		<Box row grow center>
			content
		</Box>
		<Box row width left>
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
		<script
			crossorigin
			src="https://cdn.jsdelivr.net/gh/titoBouzout/crippling-sorrow-styling/style.js"
		></script>
		<style type="text/css">
			html,
			body,
			#root {
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
									<Box row width right>
										toolbar
									</Box>
									<Box row grow center>
										content
									</Box>
									<Box row width left>
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

1. You are responsible of defining `html`, `body` or `body > div` so the styles of this library work properly. (example, if you use `<Box grow/>` and it does not work then maybe the parent is preventing the `Box` from growing. See section "Full Working Example"
2. Rows will not take the full width unless you add to them `width="100%"`
3. It does not do any kind of prefixing. But you can add a custom function `define_processor` for prefixing before appending to the document.

## Attributes supported by `Box`

The element is `<Box></Box>`, and you can just add attributes to it without any values. Some attributes like `width` will require a value. If a value is not required, then it'll be ignored.

### Direction

Sets the direction of the children.

| attribute       | description                        |
| --------------- | ---------------------------------- |
| `row`           | children will display as a row     |
| `col`, `column` | children will display as a column  |
| `wrap`          | wraps the children as in flex-wrap |
| `no-wrap`       | disables wrapping as in flex-wrap  |

### Size

The size of the `Box` and NOT the size of the children.

| attribute    | description                                                |
| ------------ | ---------------------------------------------------------- |
| `grow`       | grow `self` as much as it can without growing the children |
| `width`      | sets the width value(if empty defaults to 100%)            |
| `min-width`  | sets the min-width value (if empty defaults to 100%)       |
| `max-width`  | sets the max-width value (if empty defaults to 100%)       |
| `height`     | sets the height value (if empty defaults to 100%)          |
| `min-height` | sets the min-height value (if empty defaults to 100%)      |
| `max-height` | sets the max-height value (if empty defaults to 100%)      |

### Children Alignment

This is the alignment of the children, NOT the alignment of the content of these children. Example: You can display a `div` aligned to the left, but the text on it aligned to the `right`. Well, in here we only control the `div` itself and not the `div` content.

| attribute    | description                                        |
| ------------ | -------------------------------------------------- |
| `left`       | aligns to left                                     |
| `top`        | aligns to top                                      |
| `right`      | aligns to right                                    |
| `bottom`     | aligns to bottom                                   |
| `horizontal` | aligns to the center horizontally                  |
| `vertical`   | aligns to the center vertically                    |
| `center`     | aligns to center, both horizontally and vertically |

### Space Between Children Elements

| attribute                  | description   |
| -------------------------- | ------------- |
| `space-around-horizontal`  | space-around  |
| `space-around-vertical`    | space-around  |
| `space-around`             | space-around  |
| `space-between-horizontal` | space-between |
| `space-between-vertical`   | space-between |
| `space-between`            | space-between |
| `space-evenly-horizontal`  | space-evenly  |
| `space-evenly-vertical`    | space-evenly  |
| `space-evenly`             | space-evenly  |

#### Bugs

- `space-around`, `space-between` and `space-evenly` use `align-content: initial;` to workaround "Can't scroll to top of flex item that is overflowing container"
- `safe center` values looks like it does not work correctly
- `space-*` seem to have problems with columns maybe

### Text

Useful text stuff.

| attribute                | description                             |
| ------------------------ | --------------------------------------- |
| `text-align`             | text-align could be left, center, right |
| `text-bold`              | bold font                               |
| `text-capitalize`        | capitalize                              |
| `text-color`             | color css property                      |
| `text-size`, `font-size` | font size                               |
| `text-regular`           | no bold font                            |
| `text-no-underline`      | do not underline                        |
| `text-small`             | font size small                         |
| `text-crop`              | crops the text                          |
| `text-no-wrap`           | nowrap the text if it overflows         |
| `text-shadow`            | text-shadow                             |
| `text-wrap`              | wrap the text if it overflows           |
| `text-multiline`         | sets line-height:1.4;                   |
| `text-underline`         | underline                               |
| `text-uppercase`         | uppercase                               |

#### Bugs

- `text-crop` ellipsis will only be shown if the container in not `display:flex` (aka not `row/col/grow`), if you want to show ellipsis in a flex container then wrap it like `<Box row><Box text-crop>The..</Box></Box>`

### Scroll

| attribute      | description                                                      |
| -------------- | ---------------------------------------------------------------- |
| `scroll`       | scrolls both vertically and horizontally when overflows          |
| `scroll-x`     | scrolls horizontally when overflows                              |
| `scroll-y`     | scrolls vertically when overflows                                |
| `scroll-thin`  | to set the size of the scrollbar to thin                         |
| `scroll-color` | an array [background, thumb], like scroll-color={['red', 'blue]} |

### Cursor

| attribute       | description    |
| --------------- | -------------- |
| `cursor-hand`   | cursor pointer |
| `cursor-ignore` | ignore events  |

### Selection

| attribute              | description                |
| ---------------------- | -------------------------- |
| `selection-none`       | prevent text selection     |
| `selection-color`      | selection text color       |
| `selection-background` | selection background color |

### Padding / Margin / Border

| attribute        | description                               |
| ---------------- | ----------------------------------------- |
| `border-bottom`  | border bottom                             |
| `border-left`    | border left                               |
| `border-right`   | border right                              |
| `border-top`     | border top                                |
| `border`         | border                                    |
| `margin-bottom`  | margin bottom                             |
| `margin-left`    | margin left                               |
| `margin-right`   | margin right                              |
| `margin-top`     | margin top                                |
| `margin`         | margin                                    |
| `padding-bottom` | padding bottom                            |
| `padding-left`   | padding left                              |
| `padding-right`  | padding right                             |
| `padding-top`    | padding top                               |
| `padding`        | padding                                   |
| `radius`         | border-radius (if empty defaults to 100%) |

### CSS

Attributes to add custom CSS/classNames. Priority, the ones on top overwrite the ones on bottom:

1. `css-parent` overwrites:
2. `define_attribute_high_priority` functions, overwrites:
3. `<Box style={{background:'red';}}/>` overwrites:
4. `<Box css="background:red;"/>` overwrites:
5. `<Box grow/>` overwrites:
6. `css('background:red;');`
7. `className` is unknown if overwrites or not because depends were you include the style sheet.

Please Note: if you set an attribute as `!important` same order will apply but `!important` values will still be important.

| attribute    | description                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `style`      | React standard object for styles. Please note these get added as classes, not as a style attribute. |
| `className`  | React standard string with classNames                                                               |
| `css`        | string with regular css properties                                                                  |
| `css-parent` | string with regular css properties, to be applied to the parent. This is :parent selector           |

#### Bugs

- `css-parent` wasnt tested

### breakpoints

By prefixing any css attribute with the following keywords you can apply media query styles.

| attribute | description                     |
| --------- | ------------------------------- |
| `@mobile` | screens that are 768px or less  |
| `@tablet` | screens that are 1023px or less |
| `@small`  | screens that are 1366px or less |

#### Examples

```html

<Box css=`
	@mobile background:red;
	@mobile padding:10px;
	@tablet background:blue;
	@tablet padding:10px;
	@small background:orange;
	background:violet;
	color: black;
`>Hola!</Box>

const Button = css(`
	@mobile background:red;
	@mobile padding:10px;
	@tablet background:blue;
	@tablet padding:10px;
	@small background:orange;
	background:violet;
	color: black;
`)

```

### Random Helpers As We See These Fit

| attribute      | description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| `absolute`     | position absolute                                                               |
| `relative`     | position relative                                                               |
| `background`   | background css property                                                         |
| `block`        | display block                                                                   |
| `inline-block` | display inline-block                                                            |
| `inline-flex`  | display inline-flex                                                             |
| `inline`       | display inline                                                                  |
| `collapse`     | sets the visibility to collapsed                                                |
| `fixed`        | position fixed top 0 left 0                                                     |
| `full`         | full width and height with overflow hidden                                      |
| `layer`        | forces the browser to create a layer using `transform:translateZ(0);`           |
| `overflow`     | overflow hidden                                                                 |
| `drop-shadow`  | sets the filter to drop-shadow and expects a value with unit, drop-shadow='4px' |
| `z`            | z-index                                                                         |

### Core

| attribute   | description                                                                                                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element`   | `string`, `class` or `function` telling what kind of element the Box should be. By default is a `div`, but if you do `<Box element="span"/>`, it should just work and use a `span` instead of a `div`. |
| `reference` | as `ref` is forbidden as props of custom elements, we forward ref to the html element using `reference` instead                                                                                        |

#### Examples

```jsx
// plain jsx

;<Box element="span">Hola!</Box>

// using the component factory

const Button = css(
	`
		color: black;
	`,
	'span',
)

// using any other component

function Component_NOTICE_ME(props) {
	// props.className will contain all the classes for "grow col"
	return <div className={props.className} />
}

;<Box grow col element={Component_NOTICE_ME}>
	Hola!
</Box>

const Button = css(
	`
		color: black;
	`,
	Component_NOTICE_ME,
)
```

## API

### Globals

Including this creates three globals:

- `Style` the class itself.
- `Box` the component `Box`
- `css` a component factory

### Valid use cases for `Box` component

```html

<Box></Box>

<Box col grow></Box>

<Box css="background:red"></Box>

<Box css=`
	class:hover{
		background:red;
	}
	class >a{
		background:green
	}
`></Box>

<Box style={{background:'red'}}></Box>

<Box col grow css=`
	class:hover{
		background:red;
	}
	class >a{
		background:green
	}
`
style={{color:'blue'}}></Box>

```

### Invalid use cases for `Box` component. It Will Not Work !

These attributes cannot have a class.

```html
<Box css-parent="class{background:red;}"></Box>
```

### Valid use cases for `css` component factory

```javascript
// this is basically the same as Box
const Component = css()

// defining a default css for the component
const Component = css('background:red;')

// class gets automatically replaced for a unique name
const Component = css('class{background:red;}')

// this is why class is handy
const Component = css('class:hover{background:red;}')

// as many classes as you want
const Component = css('class{color:red;}class>a{color:blue;}')

// the default element is a div, you can change it
const Component = css('background:red;', 'span')

// using other components in a simple way
function Component_NOTICE_ME(props) {
	// here className was automatically created
	return (
		<div className={props.className}>
			<a href="index.html">{props.children}</a>
		</div>
	)
}
const Red = css('background:red', Something_NOTICE_ME)
const Blue = css('background:blue', Something_NOTICE_ME)

// Then you just do
// <Red>the red link!</Red>
// <Red padding="5px">the red link!</Red>
// <Blue>the blue link!</Blue>

// sort styled-components
const Button = css(
	`
		display: inline-block;
		border-radius: 3px;
	`,
	'button',
)
```

### Extending. You can define new static and dynamic attributes for `Box`

#### Static argument

We add a new static attribute named fancy-margin

```javascript
style.define_attribute('fancy-margin', 'margin:0 auto;')

// You now can use as <Box fancy-margin></Box>
```

Sometimes the attributes you add get overwritten by something else. In that case you can assign to the attributes a higher priority by defining these as high priority instead.

```javascript
style.define_attribute_high_priority('fancy-margin', 'margin:0 auto;')

// You now can use as <Box fancy-margin></Box>
```

#### Dynamic argument

Lets say we add a new dynamic attribute named random-margin. This is a function that gets called, it should return a string with css properties, NOT classes.

```javascript
style.define_dynamic_attribute('random-margin', function(value, props) {
	return 'margin:' + ((Math.random() * 10) | 0) + 'px;padding:5px;'
})

// You then can use as <Box random-margin></Box>
```

The arguments:

##### `value`

Is the value of the attribute. If you do `<Box random-margin="false"></Box>` Then the value will be "false"

##### `props`

The react props object. This is handy so you can look up other attributes.

`if(props.margin) { /* as has a defined margin do not add a random margin! */ }`

##### High Priority

You can also define a high priority dynamic attribute.

```javascript
// defining a dynamic attribute with high priority
style.define_dynamic_attribute_high_priority('random-margin', function(value, props) {
	// we avoid adding a random margin to something that already has a margin defined
	if (props.margin) return ''
	// yeah!
	return 'margin:' + ((Math.random() * 10) | 0) + 'px;'
})
```

#### Processor

You can hook just before the styles are appended to the document to do some processing.

```javascript
// here we change all margins and paddings to use calc and multiply for --density var
style.define_processor(function(styles) {
	return styles.replace(
		/(margin|padding)(-left|-right|-top|-bottom)?:([^;]+);/g,
		'$1$2:calc($3 * var(--density));',
	)
})
```

#### How To Debug

As we are going to create unique classes, we are going to reuse everywhere any class that has the same properties. So if you edit the properties of any class, you're basically editing everything globally. You should test/debug by editing `element.style` in the developer console and not the classes.

To set debug to true do `style.debug = true`

- This will print the attributes in the elements as `data-*`
- Will allow edit the css in the developer console, because when you arent debuging the css is injected using sheet.insertRule and that way isnt editable

### Validating

It has defined a function to validate complete classes attached to an element together, but currently does not validate anything. It does not pretend to validate everything, just the annoying things that could cause problems.

## Features

- easy to think about layouts
- some handy default attributes
- easy to use mobile breakpoints
- deduplicates css
- is efficient

## TODO

- Maybe enforce style coupling: if an animation with transform is used, then will-change: transform; should be there
- Maybe change pixels to em on the fly
- \*-waterfall (should apply the same style too all immediate children)
- \*-waterfall-deep (should apply the same style too all children)

## Authors

- Tito Bouzout https://github.com/titoBouzout
- Kilo https://github.com/boredofnames
