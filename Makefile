.PHONY: test

build: trafo.js trafo.min.js

trafo.js: index.js
	$$(npm bin)/webpack $< $@

trafo.min.js: index.js
	$$(npm bin)/webpack -p $< $@

test: trafo.js
	hs -o
