.PHONY: test

build: node_modules trafo.js trafo.min.js

trafo.js: index.js
	$$(npm bin)/webpack $< $@

trafo.min.js: index.js
	$$(npm bin)/webpack -p $< $@

test: trafo.js
	hs -o

node_modules: package.json
	npm install --ignore-scripts
	/usr/bin/touch $@
