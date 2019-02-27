# Crippling Sorrow Styling

A Box react element to solve layout. Example:

	<Box row>content is displayed in a row</Box>


## Attributes (most are self explanatory some are a bit tricky)

### row / column

should display all the immediate content as a row/column

### grow

should grow self not the children

### wrap

should wrap the content as in flex-wrap

### scroll-y / scroll-x

should scroll-y/x when overflows

### inline

should display:inline

### width / height

should set the width/height

### left / right / top / bottom / horizontal(center) / vertical(center)

should align the childrens (not the children contents)

### spaced

should space the childrens evenly/around or whatever

### crop

should crop the text when overflows

### content-left / content-right / content-top / content-bottom / content-horizontal(center) / content-vertical(center)

should align the content of the childrens

### basis

should control the flex-basis attribute (this attribute kinda overlaps with width or height (depends if col or row) Im not sure I want to use basis attribute as I dont want stuff to change size and the purpose of basis is to change size based on a proportion (if I remember correctly)

