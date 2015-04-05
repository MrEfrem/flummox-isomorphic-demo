BIN=node_modules/.bin

BABEL_ARGS = --blacklist regenerator,es6.constants,es6.blockScoping --optional asyncToGenerator

SRC_DIR_CSS = src/client/css
SRC_CSS = $(shell find $(SRC_DIR_CSS) -name "*.css")
SRC_JS = $(shell find src -regextype posix-extended -regex "src\/(shared|server)\/.*\.js")
LIB_JS = $(patsubst src/%.js,lib/%.js,$(SRC_JS))

DEST_DIR_CSS = public/css
DEST_CSS = $(DEST_DIR_CSS)/app.css
DEST_MIN_CSS = $(DEST_DIR_CSS)/app.min.css

build: fast-js webpack minify-css

# Watch for changes
watch: fast-js-dev
	@NODE_ENV=development $(MAKE) -j5 watch-js dev-server webpack-server watch-css

clean:
	rm -f $(DEST_CSS)
	rm -f $(DEST_MIN_CSS)
	rm -f public/js/app.min.js
	rm -rf lib/

# Transpile JavaScript using Babel
js: $(LIB_JS)

$(LIB_JS): lib/%.js: src/%.js
	mkdir -p $(dir $@)
	$(BIN)/babel $< -o $@ $(BABEL_ARGS)

fast-js-dev:
	$(BIN)/babel src -d lib $(BABEL_ARGS)

fast-js:
	$(BIN)/babel src/server -d lib/server $(BABEL_ARGS)
	$(BIN)/babel src/shared -d lib/shared $(BABEL_ARGS)

watch-js:
	$(BIN)/babel src -d lib $(BABEL_ARGS) -w

dev-server: $(LIB_JS)
	nodemon ./lib/server/index.js

webpack-server: $(LIB_JS)
	node --harmony ./lib/server/webpack

webpack: public/js/app.js

public/js/app.js:
	$(BIN)/webpack

css: $(DEST_CSS)

minify-css: css $(DEST_MIN_CSS)

$(DEST_CSS): $(SRC_CSS)
	mkdir -p $(dir $@) && cat $(SRC_CSS) | $(BIN)/autoprefixer > $@

$(DEST_MIN_CSS): $(DEST_CSS)
	$(BIN)/cleancss $< > $@ && rm -f $<

watch-css: $(SRC_CSS)
	$(BIN)/watch "mkdir -p $(DEST_DIR_CSS) && cat $(SRC_CSS) | $(BIN)/autoprefixer > $(DEST_CSS) && $(BIN)/cleancss --source-map $(DEST_CSS) -o $(DEST_MIN_CSS)" $(SRC_DIR_CSS)

.PHONY: clean fast-js public/js/app.js