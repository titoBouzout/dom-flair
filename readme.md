# Styled

The goal of this project is to solve any or most `html` layout issues in intuitive ways via attributes without having to think much about CSS. For example `<div col grow></div>`. That's it.

It could also help with trivial CSS, For example `<div text-capitalize></div>` to capitalize the `div` contents.

## Installation

### ES module

`npm install -g https://github.com/titoBouzout/styled.git`

Import it where you gonna use is

`import 'styled'`

The element you mount to should be `display:flex;flex:1;` for the attributes to work.

## Examples

### The "Holy Grail Layout":

Sticky footer

```html
<div col grow>
	<div>header</div>
	<div grow>content</div>
	<div>footer</div>
</div>
```

### Elaborate Example:

Has two sidebars, a toolbar, a footer, and grows in the middle content:

```html
<div grow>
	<div col grow horizontal>left sidebar</div>
	<div col grow>
		<div row right>toolbar</div>
		<div row grow center>content</div>
		<div row left>footer</div>
	</div>
	<div col grow center>right sidebar</div>
</div>
```

## Attributes supported

NOTE: Most attributes support the prefix `child-` which will apply the styles to all immediate children, and `all-` which will apply the styles to every children of the whole tree.

### Direction

Sets the direction of the children.

| attribute       | description                        |
| --------------- | ---------------------------------- |
| `row`           | children will display as a row     |
| `col`, `column` | children will display as a column  |
| `wrap`          | wraps the children as in flex-wrap |
| `no-wrap`       | disables wrapping as in flex-wrap  |

### Size

| attribute     | description                                                |
| ------------- | ---------------------------------------------------------- |
| `grow`        | grow `self` as much as it can without growing the children |
| `full-width`  | sets the width to 100%                                     |
| `min-width`   | sets the min-width to 100%                                 |
| `max-width`   | sets the max-width to 100%                                 |
| `full-height` | sets the height to 100%                                    |
| `min-height`  | sets the min-height to 100%                                |
| `max-height`  | sets the max-height to 100%                                |

### Children Alignment

Alignment of the children, NOT the alignment of the content of these children. Example: You can display a `div` aligned to the left, but the text on it aligned to the `right`. Well, in here we only control the `div` itself and not the `div` content.

| attribute    | description                                        |
| ------------ | -------------------------------------------------- |
| `left`       | aligns to left, sets left to 0                     |
| `top`        | aligns to top, sets top to 0                       |
| `right`      | aligns to right, sets right to 0                   |
| `bottom`     | aligns to bottom, sets botttom to 0                |
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

| attribute           | description                     |
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

#### Bugs

- `text-crop` ellipsis will only be shown if the container in not `display:flex` (aka not `row/col/grow`), if you want to show ellipsis in a flex container then wrap it like `<div row><div text-crop>The..</div></div>`

### Scroll

| attribute           | description                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| `scroll`            | scrolls both vertically and horizontally when overflows                                             |
| `scroll-x`          | scrolls horizontally when overflows                                                                 |
| `scroll-y`          | scrolls vertically when overflows                                                                   |
| `scroll-thin`       | to set the size of the scrollbar to thin                                                            |
| `no-scroll`         | to set the size of the scrollbar to 0px and display none                                            |
| `scroll-color`      | sets the color for the bar `<div scroll-color style="--scroll-color:black"></div>`                  |
| `scroll-background` | sets the color for the background `<div scroll-background style="--scroll-background:black"></div>` |

#### Bugs

- `scroll-color` and `scroll-background` must both be provided for this properties to work

### Selection

| attribute              | description                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `selection-none`       | prevent text selection                                                                             |
| `selection-all`        | selects all text on focus                                                                          |
| `selection-text`       | allows text selection                                                                              |
| `selection-color`      | selection text color `<div selection-color style="--selection-color:black"></div>`                 |
| `selection-background` | selection background color `<div selection-background style="--selection-background:black"></div>` |

### Cursor

| attribute          | description        |
| ------------------ | ------------------ |
| `cursor-hand`      | cursor pointer     |
| `cursor-ignore`    | ignore events      |
| `cursor-no-ignore` | dont ignore events |

### Display

| attribute      | description                                                   |
| -------------- | ------------------------------------------------------------- |
| `absolute`     | position absolute                                             |
| `relative`     | position relative                                             |
| `fixed`        | position fixed                                                |
| `full`         | full width and height with overflow hidden                    |
| `full-window`  | full width and height with overflow hidden and top and left 0 |
| `block`        | display block                                                 |
| `inline`       | display inline                                                |
| `inline-block` | display inline-block                                          |
| `inline-flex`  | display inline-flex                                           |
| `hidden`       | display none                                                  |
| `collapse`     | sets the visibility to collapsed                              |
| `layer`        | forces a layer using `transform:translateZ(0);`               |
| `overflow`     | overflow hidden                                               |
| `border-box`   | box-sizing property                                           |
| `content-box`  | box-sizing property                                           |
| `no-empty`     | hides the element if empty                                    |
| `circle`       | set border-radius to 100%                                     |

## Features

- easy to think about layouts
- some handy default attributes
- deduplicates css
- is efficient

## Authors

- Tito Bouzout https://github.com/titoBouzout
- Kilo https://github.com/boredofnames

URL: https://github.com/titoBouzout/styled
