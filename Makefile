.PHONY: test clean

build: node_modules trafo.js trafo.min.js

clean:
	rm -f trafo.*

trafo.js: index.js
	NODE_ENV=development BABEL_ENV=rollup $$(npm bin)/rollup $< --config=./rollup.config.js --output=./$@

trafo.min.js: index.js
	NODE_ENV=production BABEL_ENV=rollup $$(npm bin)/rollup $< --config=./rollup.config.js --output=./$@

test: trafo.js
	hs -o

node_modules: package.json
	npm install --ignore-scripts
	/usr/bin/touch $@
