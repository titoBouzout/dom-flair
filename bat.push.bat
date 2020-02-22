
echo import React from 'react' > index.js
type style.js >> index.js
echo export default Style;exports.css = css;exports.Box = Box; >> index.js

git add --all
git commit -m "update"

git push --all --prune
