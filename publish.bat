
git add --all
git commit -m "update"

call npm version patch

git add --all
git commit -m "update version"

git push --all --prune

call npm install -g https://github.com/titoBouzout/styled.git

exit