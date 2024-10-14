 install: ;@echo "Installing....."; \
	npm ci

 gendiff: ;@echo "Run diff....."; \
    node bin/gendiff.js --help


 publish: ;@echo "Publish brain-games....."; \
    npm publish --dry-run