install:
	npm ci

run:
	bin/nodejs-package.js 10

deps-update:
	npx ncu -u

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npx release-it
