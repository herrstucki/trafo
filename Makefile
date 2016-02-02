.PHONY: test

build: trafo.js trafo.min.js

trafo.js: index.js
	$$(npm bin)/webpack index.js trafo.js

trafo.min.js: index.js
	$$(npm bin)/webpack -p index.js trafo.js

test: trafo.js
	hs -o
