# Crippling Sorrow Styling

This goal of this project is to have just one React "meta component" named `Box` to solve any or most `html` layout issues in intuitive ways without having to think anything about CSS, like lets say `<Box col grow></Box>`. That's it.

It could also help with trivial CSS that can be just named in an attribute, like lets say `<Box capitalize></Box>` to capitalize the `Box` contents. It could also be used similarly to styled-components.

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

### Elaborated Example:

Has two sidebars, a toolbar, a footer and grows in the middle content:

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

## Caveats / Surprises

1. rows will not take the full width unless you add to them width="100%"
2. you need to explicit tell how stuff is aligned

## Attributes supported by `Box`

The element is `<Box></Box>` and you can just add attributes to it without any values. Some attributes like `width` will require a value, but if the value is not required then it just gonna be ignored.

### Definitions

When we said `self` is because we referring to the `Box` element itself you just added the `attribute` to, and not to the `childrens`.

### Direction

attribute | description | status
--- | --- | ---
`row` | childrens will display as a row | implemented
`col` | childrens will display as a column | implemented
`wrap` | wraps the childrens as in flex-wrap | implemented
`nowrap` | disables wrapping | implemented

### Size

The size of the `Box` and NOT the size of the childrens.

attribute | description | status
--- | --- | ---
`grow` | grow `self` as much as it can | implemented
`basis` | sets the flex-basis value | buggy,  we forcing `align-self:stretch;` to `grow` so flex-basis is ignored.
`w` | sets the width value |  implemented
`max-w` | sets the max-width value  | implemented
`min-w` | sets the min-width value  | implemented
`h` | sets the height value  | implemented
`max-h` | sets the max-height value  | implemented
`min-h` | sets the min-height value  | implemented

### Children Alignment

This is the alignment of the children and NOT the alignment of the content of these children. Example: You can display a `div` aligned to the left but the text on it aligned to the `right`. Well, in here we only control the `div` itself and not the `div` contents.

attribute | description | status
--- | --- | ---
`left` | aligns to left | implemented
`top` | aligns to top | implemented
`right` | aligns to right | implemented
`bottom` | aligns to bottom | implemented
`horizontal` | aligns to the center horizontally | implemented
`vertical` | aligns to the center vertically | implemented
`center` | aligns to center, both horizontally and vertically | implemented

### Children Contents Alignment

This is the alignment of the children contents and NOT the alignment of the children. Example: You can display a `div` aligned to the left but the text on it aligned to the `right`. Well, in here we only control the text on the `div` and not the `div` itself.

attribute | description | status
--- | --- | ---
`content-left` | aligns the childrens content to left | not implemented
`content-top` | aligns the childrens content to top | not implemented
`content-right` | aligns the childrens content to right | not implemented
`content-bottom` | aligns the childrens content to bottom | not implemented
`content-horizontal` | aligns the childrens content to the center horizontally | not implemented
`content-vertical` | aligns the childrens content to the center vertically | not implemented
`content-center` | aligns the childrens content to center, both horizontally and vertically | not implemented

### Space Between Children Elements

This is semi-implemented. It could be improved like in horizontal-space-around and vertical-space-evenly. But Im not sure.

attribute | description | status
--- | --- | ---
`space-around` | space-around | semi implemented
`space-between` | space-between | semi implemented
`space-evenly` | space-evenly | semi implemented
`stretch` | stretch | implemented, not tested

### Text

attribute | description | status
--- | --- | ---
`text-crop` | crops the text if it overflows | implemented
`text-nowrap` | nowrap the text if it overflows | implemented
`text-wrap` | wrap the text if it overflows | implemented
`small` | font size small | implemented
`bold` | bold font | implemented
`no-bold` | no bold font | implemented
`underline` | underline  | implemented
`no-underline` | do not underline  | implemented
`uppercase` | uppercase  | implemented
`capitalize` | capitalize  | implemented
`size` | font size  | implemented
`text` | sets line-height:1.4;  | implemented
`align` | text-align could be left, center, right  | implemented

### Scroll

attribute | description | status
--- | --- | ---
`scroll` | scrolls both vertically and horizontally when overflows | implemented
`scroll-x` | scrolls horizontally when overflows | implemented
`scroll-y` | scrolls vertically when overflows | implemented

### Cursor

attribute | description | status
--- | --- | ---
`hand` | cursor pointer | implemented
`ignore` | ignore events  | implemented
`no-select` | prevent text selection  | implemented

### Padding / Margin / Border

attribute | description | status
--- | --- | ---
`padding` | padding | implemented
`p` | padding | implemented
`pb` | padding bottom | implemented
`pl` | padding left | implemented
`pr` | padding right | implemented
`pt` | padding top | implemented
`margin` | margin | implemented
`m` | margin | implemented
`mb` | margin bottom | implemented
`ml` | margin left | implemented
`mr` | margin right | implemented
`mt` | margin top | implemented
`border` | border | implemented
`b` | border | implemented
`bb` | border bottom | implemented
`bl` | border left | implemented
`br` | border right | implemented
`bt` | border top | implemented

### CSS

Attributes to add custom CSS/classNames. Priority: higher overwrites lower.

1. css_children (attribute)
4. Box className
2. Box (attributes)
3. Box.style (the react standard style object)
5. css_parent (attribute)

attribute | description | status
--- | --- | ---
`style` | React standard object for styles. Please note these get added as classes not as a style attribute. | implemented
`className` | React standard string with classNames | implemented
`css` | string with regular css properties | implemented
`css_children` | string with regular css properties to be applied to childrens | not implemented
`css_parent` | string with regular css properties to be applied to the parent. This is :parent selector xD | implemented

### Random Helpers As We See These Fit

attribute | description | status
--- | --- | ---
`block` | display block  | implemented
`inline` | display inline  | implemented
`inline-block` | display inline-block  | implemented
`relative` | position relative  | implemented
`absolute` | position absolute  | implemented
`fixed` | position fixed top 0 left 0  | implemented
`full` |  full width and height with overflow hidden  | implemented
`overflow` |  overflow hidden  | implemented
`layer` |  forces the browser to create a layer using transform:translateZ(0); | implemented
`z` | z-index | implemented

### Core

attribute | description | status
--- | --- | ---
`element` | a string telling what kind of element should the Box be, by default is just a `div`, but if you do `<Box element="span"/>` it should just work and use a `span` instead of a `div`. | implemented

## Features

- easy to think about layouts
- some handy default attributes
- easy to use mobile breakpoints
- deduplicates css

## API

### Globals

Including this creates four globals:

- `Style` the class itself.
- `style` the class instance.
- `Box` the component `Box`
- `css` a component factory

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

// using other components
function Something(props){
	// here className was automatically created
	return <div className={props.className}>
		<a href="index.html">{props.children}</a>
	</div>
}
var Red = css('background:red', Something)
var Blue = css('background:blue', Something)

// <Red>the red link!</Red>
// <Blue>the blue link!</Blue>

// sort styled-components
var Button = css(`
	display: inline-block;
	border-radius: 3px;
`, 'button')

var Button = css`
	display: inline-block;
	border-radius: 3px;
	border: 2px solid white;
`

```

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

<Box css_parent="background:red"></Box>
<Box css_children="background:red"></Box>

```

### Extending. You can define new attributes for `Box`

Lets say we add a new attribute named random_margin

```javascript

style.define_attribute('random_margin',
	function(value, props, style_hp) {
		return 'margin:' + ((Math.random()*10)|0) + 'px;padding:5px;'
	}
)

```

Your custom function will receive three arguments. And should return a string with css properties, NOT classes.

The arguments:

#### `value`

Is the value of the attribute. Lets say you create a new attribute named random_margin. So if you do `<Box random_margin="false"></Box>` Then the value will be "false"

#### `props`

The react props object. This is handy so you can look up other attributes.

`if(props.margin) { /* do not use random margin */ }`

#### `style_hp`  style high priority

Sometimes the attributes you add get overwritten by something else. In that case you can assign to your attributes a higher priority by defining the properties in `style_hp.value`. IMPORTANT PLEASE READ WHAT TO RETURN

#### What to `return`

Should return a string with css properties, NOT classes. It could also return an empty string.

In the case your custom attribute gets overwritten by something else then you should return an empty string and then `append` your css properties to the argument `style_hp.value`

Please note you should use `style_hp.value +=` to `append` to it. If you don't `append` then you gonna discard any already defined high priority property.

```javascript

style.define_attribute('random_margin',
	function(value, props, style_hp) {
		if(props.margin) // we avoid adding a random margin to something that already has a margin defined
			return ''
		return 'margin:' + ((Math.random()*10)|0) + 'px;'
	}
)

function Component(){

	const Blue = css(`color: blue;`)

	return <Box>
			<Blue random_margin margin="2px">
				Im blue
				<Box row grow random_margin>mt margin is random</Box>
			</Blue>
	</Box>
}

style.define_attribute('dont_overwrite_my_margin',
	function(value, props, style_hp) {
		style_hp.value += 'margin:' + ((Math.random()*10)|0) + 'px;'
		return ''
	}
)

function Component(){

	const Blue = css(`color: blue;`)

	return <Box>
			<Blue dont_overwrite_my_margin margin="2px">
				Im blue
				<Box row grow dont_overwrite_my_margin>mt margin is random</Box>
			</Blue>
	</Box>
}

```

#### How To Debug In The Console

As we gonna create unique classes, we gonna reuse everywhere any class that has the same properties. So if you edit the properties of any class, you basically editing eveything globally. You should test/debug by editing "element style" in the developer console and not the classes.

To set debug to true do `style.debug = true`

This will print the attributes in the elements as `data-*`

## TODO

- enforce style coupling: if an animation with transform is used then will-change: transform; should be there
- maybe change pixels to em on the fly
- maybe add box-sizing automatically
- validate css (like in if theres width and margin then box-sizing must be there)
- memoize string processing functions or indicate which functions may be memoize
- document mobile features. I still didnt use so no documentation.

## Bugs

- If you use template literals we will just use string.raw[0] without doing any sort of processing. I dont use this.
- we appending a default style for the `body`, `html` and the root `div` inside the `body` so our css works.