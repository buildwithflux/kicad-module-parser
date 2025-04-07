
# Releasing a new version

```bash
# Check out the commit you want to release, define:
TAG=2.0.0-rc.1 # The tag we want to release
# Then run:
git checkout -B release-prep  # Create a branch, could be anything, just to make sure we don't commit this to master
yarn build                    # Prepare dist/

git add -f dist/              # Add dist/ to git, despite .gitignore
git commit -m "Preparing release"

git tag $TAG                  # Push the release tag
git push origin tag $TAG
```
