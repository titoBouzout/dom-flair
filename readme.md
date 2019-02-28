# Crippling Sorrow Styling

This project is about having just one React "meta component" named `Box` to solve any `html` layout issues in intuitive ways without having to think anything about CSS. It does not only do layout, but also it could help with trivial CSS that can be just named as an attribute, like lets say `<Box capitalize></Box>` to just capitalize the Box contents.

- Currently this project uses flexbox properties under the hood but is not limited to flexbox, as the complete idea is to be intuitive, and we shouldn't care about the technology used behind it.
- The secondary goal is to try to avoid having to deal with CSS as much as possible, but this goal is just secondary.

In other terms: this project dislikes CSS and wants to avoid it as much as possible by providing intuitive solutions.

## The "Holy Grail Layout" (sticky footer) example:

```jsx
<Box col grow>
	<Box>header</Box>
	<Box grow>content</Box>
	<Box>footer</Box>
</Box>
```

## A "complicated" example

With two sidebars, a toolbar, footer and growing middle content:

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

## Attributes of the Box React Element

The element is `<Box></Box>` and you can just add attributes to it without any values. Some attributes like `width` will require a value, obviously, but if the value is not required then it just gonna be ignored.

Here have a table of the complete list of the `Box` attributes:

### Core

attribute | description | status
--- | --- | ---
`element` | a string telling what kind of element should the Box have, by default is just a `div`, but if you do `<Box element="span"/>` it should just work and use a `span` instead of a `div`. | implemented,  maybe we should name this `item`

### Direction

attribute | description | status
--- | --- | ---
`row` | childrens will display as a row | implemented
`col` | childrens will display as a column | implemented

### Size

attribute | description | status
--- | --- | ---
`grow` | grow as much as you can | implemented
`basis` | sets the flex-basis value | implemented, this has a bug maybe because we forcing elements with grow as "stretch"
`width` | sets the width value |  implemented
`height` | sets the height value  | implemented
`max-width` | sets the max-width value  | implemented
`max-height` | sets the max-height value  | implemented

### Children Alignment

attribute | description | status
--- | --- | ---
`left` | aligns to left | implemented
`top` | aligns to top | implemented
`right` | aligns to right | implemented
`bottom` | aligns to bottom | implemented
`horizontal` | aligns to the center horizontally | implemented
`vertical` | aligns to the center vertically | implemented
`center` | aligns to center both horizontally and vertically | implemented
`wrap` | not sure if call this align, this should wrap any row or column items as in flex-wrap | implemented

### Children Content Alignment

attribute | description | status
--- | --- | ---
`content-left` | aligns the childrens content to left | not implemented
`content-top` | aligns the childrens content to top | not implemented
`content-right` | aligns the childrens content to right | not implemented
`content-bottom` | aligns the childrens content to bottom | not implemented
`content-horizontal` | aligns the childrens content to the center horizontally | not implemented
`content-vertical` | aligns the childrens content to the center vertically | not implemented
`content-center` | aligns the childrens content to center both horizontally and vertically | not implemented

### Space Between Elements

attribute | description | status
--- | --- | ---
`space-around` |  space-around | implemented it could be improved like in horizontal-space-around and vertical-something-else
`space-between` | space-between | implemented it could be improved like in horizontal-space-around and vertical-something-else
`space-evenly` | space-evenly | implemented it could be improved like in horizontal-space-around and vertical-something-else
`stretch` | stretch | implemented not tested | implemented it could be improved like in horizontal-space-around and vertical-something-else

### Text
attribute | description | status
--- | --- | ---
`crop` | it should crop the text if it overflows | implemented not sure if crops on every situation | implemented but not really tested
`nowrap` | it should nowrap the text if it overflows | implemented

### CSS

attribute | description | status
--- | --- | ---
`style` | React standard object for styles (to be merged with all the styles of this element and having higher priority than Box attributes [you can overwrite Box attributes using this]) | not implemented depends of styled | not implemented
`className` | react standard string with classNames (to be merged with all the styles of this element and having higher priority than Box attributes but lower than Box.style) | not implemented depends of styled | not implemented


### Random CSS Helpers As We See These Fit

attribute | description | status
--- | --- | ---
`scroll-y` | should scroll horizontally when overflows | implemented
`scroll-x` | should scroll vertically when overflows | implemented
`inline` | should display inline  | implemented



