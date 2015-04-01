BIN=node_modules/.bin

WEBPACK_CMD = node_modules/.bin/webpack
WATCH_CMD = node_modules/.bin/watch
AUTOPREFIXER_CMD = node_modules/.bin/autoprefixer
CLEANCSS_CMD = node_modules/.bin/cleancss

BABEL_ARGS = --experimental --source-maps-inline

SRC_DIR_CSS = src/client/css
SRC_CSS = $(shell find $(SRC_DIR_CSS) -name "*.css")
SRC_JS = $(shell  find src -regextype posix-extended -regex "src\/(shared|server)\/.*\.js")
LIB_JS = $(patsubst src/%.js,lib/%.js,$(SRC_JS))

DEST_DIR_CSS = public/css
DEST_CSS = $(DEST_DIR_CSS)/app.css
DEST_MIN_CSS = $(DEST_DIR_CSS)/app.min.css

build: build-dev minify-css

build-dev: js webpack css

# Build application quickly
# Faster on first build, but not after that
fast-build: fast-js build

# Watch for changes
watch: minify-css
	@NODE_ENV=development $(MAKE) -j5 dev-server webpack-server watch-css watch-js

clean:
	rm -f $(DEST_MIN_CSS)
	rm -f public/js/app.min.js
	rm -rf lib/

# Transpile JavaScript using Babel
js: $(LIB_JS)

$(LIB_JS): lib/%.js: src/%.js
	mkdir -p $(dir $@)
	$(BIN)/babel $< -o $@ $(BABEL_ARGS)

fast-js:
	$(BIN)/babel src -d lib $(BABEL_ARGS)

watch-js:
	$(BIN)/babel src -d lib $(BABEL_ARGS) -w

dev-server: $(LIB_JS)
	nodemon ./lib/server/app.js

webpack-server: $(LIB_JS)
	node ./lib/server/webpack

webpack: public/js/app.js

public/js/app.js: $(SRC_JS)
	$(BIN)/webpack

css: $(DEST_CSS)

minify-css: css $(DEST_MIN_CSS)

$(DEST_CSS): $(SRC_CSS)
	mkdir -p $(dir $@) && cat $(SRC_CSS) | $(BIN)/autoprefixer > $@

$(DEST_MIN_CSS): $(DEST_CSS)
	$(BIN)/cleancss $< > $@ && rm -f $<

watch-css: $(SRC_CSS)
	$(BIN)/watch "mkdir -p $(DEST_DIR_CSS) && cat $(SRC_CSS) | $(BIN)/autoprefixer > $(DEST_CSS) && $(BIN)/cleancss $(DEST_CSS) > $(DEST_MIN_CSS) && rm -f $(DEST_CSS)" $(SRC_DIR_CSS)

.PHONY: $(DEST_CSS) watch-js fast-js