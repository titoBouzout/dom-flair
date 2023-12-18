# DOM Flair

The goal of this project is to solve any or most `html` layout issues in intuitive ways
via the attribute `flair` without having to think much about CSS. For example
`<div flair="col grow"></div>`. That's it.

It could also help with trivial CSS, For example `<div flair="text-capitalize"></div>` to
capitalize the `div` contents.

## Installation & Usage

### ES module

`npm install dom-flair`

Import it where you gonna use is

`import 'dom-flair'`

Note: The element you mount to, should be `display:flex;flex:1;` for the attribute to
work.

### Babel Plugin

The style-sheet has around 800~ lines, you may want to include only what you use. There's
a babel plugin that will look for the attribute in `jsx` elements and create a style-sheet
with the minimal output to the desired location. Then import it as you wish.

```json
{
	"babel": {
		"plugins": [
			[
				"dom-flair/babel",
				{
					// where the stylesheet should be created
					"path": "client/dist/flair.css",
					// to include a style reset
					"reset": true
				}
			]
		]
	}
}
```

## Examples

### The "Holy Grail Layout":

Sticky footer

```html
<div flair="col grow">
	<div>header</div>
	<div flair="grow">content</div>
	<div>footer</div>
</div>
```

### Elaborate Example:

Has two sidebars, a toolbar, a footer, and grows in the middle content:

```html
<div flair="grow">
	<div flair="col grow horizontal">left sidebar</div>
	<div flair="col grow">
		<div flair="row right">toolbar</div>
		<div flair="row grow center">content</div>
		<div flair="row left">footer</div>
	</div>
	<div flair="col grow center">right sidebar</div>
</div>
```

## Values supported

### Direction

Sets the direction of the children.

| value           | description                        |
| --------------- | ---------------------------------- |
| `row`           | children will display as a row     |
| `col`, `column` | children will display as a column  |
| `wrap`          | wraps the children as in flex-wrap |
| `no-wrap`       | disables wrapping as in flex-wrap  |

### Size

| value         | description                                                |
| ------------- | ---------------------------------------------------------- |
| `grow`        | grow `self` as much as it can without growing the children |
| `full-width`  | sets the width to 100%                                     |
| `min-width`   | sets the min-width to 100%                                 |
| `max-width`   | sets the max-width to 100%                                 |
| `full-height` | sets the height to 100%                                    |
| `min-height`  | sets the min-height to 100%                                |
| `max-height`  | sets the max-height to 100%                                |

### Children Alignment

Alignment of the children, NOT the alignment of the content of these children. Example:
You can display a `div` aligned to the left, but the text on it aligned to the `right`.
Well, in here we only control the `div` itself and not the `div` content.

| value        | description                                        |
| ------------ | -------------------------------------------------- |
| `left`       | aligns to left, sets left to 0                     |
| `top`        | aligns to top, sets top to 0                       |
| `right`      | aligns to right, sets right to 0                   |
| `bottom`     | aligns to bottom, sets botttom to 0                |
| `horizontal` | aligns to the center horizontally                  |
| `vertical`   | aligns to the center vertically                    |
| `center`     | aligns to center, both horizontally and vertically |

### Space Between Children Elements

| value                      | description   |
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

- `space-around`, `space-between` and `space-evenly` use `align-content: initial;` to
  workaround "Can't scroll to top of flex item that is overflowing container"
- `safe center` values looks like it does not work correctly
- `space-*` seem to have problems with columns maybe

### Text

| value               | description                     |
| ------------------- | ------------------------------- |
| `text-center`       | sets text-align to center       |
| `text-left`         | sets text-align to left         |
| `text-right`        | sets text-align to right        |
| `text-bold`         | bold font                       |
| `text-crop`         | crops the text                  |
| `text-multiline`    | sets line-height:1.4;           |
| `text-regular`      | no bold font                    |
| `text-small`        | font size small                 |
| `text-underline`    | underline                       |
| `text-no-underline` | do not underline                |
| `text-capitalize`   | capitalize                      |
| `text-uppercase`    | uppercase                       |
| `text-no-wrap`      | nowrap the text if it overflows |
| `text-wrap`         | wrap the text if it overflows   |
| `text-pre`          | use pre-wrap                    |

#### Bugs

- `text-crop` ellipsis will only be shown if the container in not `display:flex` (aka not
  `row/col/grow`), if you want to show ellipsis in a flex container then wrap it like
  `<div flair="row"><div flair="text-crop">The..</div></div>`

### Scroll

| value          | description                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| `scroll`       | scrolls both vertically and horizontally when overflows                                                              |
| `scroll-x`     | scrolls horizontally when overflows                                                                                  |
| `scroll-y`     | scrolls vertically when overflows                                                                                    |
| `scroll-thin`  | to set the size of the scrollbar to thin                                                                             |
| `no-scroll`    | to set the size of the scrollbar to 0px and display none                                                             |
| `scroll-color` | sets the color for scroll `<div flair="scroll-color" style="--scroll-color:black;--scroll-background:black "></div>` |

#### Bugs

- `scroll-color` and `scroll-background` must both be provided for this properties to work

### Selection

| value                  | description                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `selection-none`       | prevent text selection                                                                                     |
| `selection-all`        | selects all text on focus                                                                                  |
| `selection-text`       | allows text selection                                                                                      |
| `selection-color`      | selection text color `<div flair="selection-color" style="--selection-color:black"></div>`                 |
| `selection-background` | selection background color `<div flair="selection-background" style="--selection-background:black"></div>` |
| `draggable='false'`    | sets `touch-action: none;` and `-webkit-user-drag: none;`                                                  |
| `draggable='true'`     | sets `touch-action: initial;` and `-webkit-user-drag: initial;`                                            |

### Cursor

| value              | description        |
| ------------------ | ------------------ |
| `cursor-hand`      | cursor pointer     |
| `cursor-ignore`    | ignore events      |
| `cursor-no-ignore` | dont ignore events |

### Display

| value             | description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `absolute`        | position absolute                                             |
| `relative`        | position relative                                             |
| `fixed`           | position fixed                                                |
| `full`            | full width and height with overflow hidden                    |
| `full-window`     | full width and height with overflow hidden and top and left 0 |
| `block`           | display block                                                 |
| `inline`          | display inline                                                |
| `inline-block`    | display inline-block                                          |
| `inline-flex`     | display inline-flex                                           |
| `hidden`          | display none                                                  |
| `collapse`        | sets the visibility to collapsed                              |
| `layer`           | forces a layer using `transform:translateZ(0);`               |
| `overflow`        | overflow hidden                                               |
| `visible`         | overflow visible                                              |
| `border-box`      | box-sizing property                                           |
| `content-box`     | box-sizing property                                           |
| `no-empty`        | hides the element if empty                                    |
| `circle`          | set border-radius to 100%                                     |
| `controls-none`   | hide video/audio controls                                     |
| `absolute-center` | position absolute - top, left: 50% - translate top left -50%  |

### Shadows

| value         | description                                                                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text-shadow` | `<div flair="text-shadow" style="--text-shadow-color:black"></div>` can also be used on `svg` which use a drop-shadow instead trying to match the text shadow. |
| `box-shadow`  | similar to text-shadow but for boxes. `<div flair="text-shadow" style="--box-shadow-color:black"></div>`                                                       |

### Backgrounds

| value              | description                    |
| ------------------ | ------------------------------ |
| `chess-background` | applies a checkered background |

## Features

- easy to think about layouts
- some handy default attributes
- deduplicates css
- is efficient

## Authors

- Tito Bouzout https://github.com/titoBouzout
- Kilo https://github.com/boredofnames

- URL: https://github.com/titoBouzout/dom-flair
- URL: https://www.npmjs.com/package/dom-flair
