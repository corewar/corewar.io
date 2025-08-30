#!/bin/bash
set -e

# Compile TypeScript
tsc

# Process paths with tscpaths
tscpaths -p tsconfig-build.json -s src -o dist

# Copy files from dist/src to dist
cp -r dist/src/* dist/

# Remove the src directory
rm -rf dist/src

# Fix all relative import paths - handle both ../ and ./../ patterns
find dist -name '*.js' -exec sed -i '' 's|require("\.\./|require("./|g' {} \;
find dist -name '*.js' -exec sed -i '' 's|require("\./\.\./|require("./|g' {} \;

# Fix path alias resolution issues more comprehensively
# Files in parser directory should import from ./interface/
# Files in simulator directory should import from ../parser/interface/
# Files in matches directory should import from ../parser/interface/ and ../simulator/interface/

find dist/parser -name '*.js' -exec sed -i '' 's|require("\./parser/|require("./|g' {} \;
find dist/simulator -name '*.js' -exec sed -i '' 's|require("\./parser/|require("../parser/|g' {} \;
find dist/simulator -name '*.js' -exec sed -i '' 's|require("\./simulator/|require("./|g' {} \;
find dist/matches -name '*.js' -exec sed -i '' 's|require("\./parser/|require("../parser/|g' {} \;
find dist/matches -name '*.js' -exec sed -i '' 's|require("\./simulator/|require("../simulator/|g' {} \;
find dist/matches -name '*.js' -exec sed -i '' 's|require("\./matches/|require("./|g' {} \;

echo "Build completed successfully!"
