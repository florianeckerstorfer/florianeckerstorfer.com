server:
	@@jekyll --server

render:
	@@echo "Building the site..."
	@@jekyll build

render-watch:
	@@echo "Building the site and watching for changes..."
	@@jekyll build --watch

less:
	@@echo "Compiling LESS into CSS..."
	@@lessc less/master.less > css/master.css

minify:
	@@echo "Minifying the CSS..."
	@@java -jar _build/yuicompressor.jar --verbose --type css -o _site/css/master.css _site/css/master.css
	@@echo "Minifying the HTML..."
	@@java -jar _build/htmlcompressor.jar -r --type html -o _site _site

cv-pdf:
	@@echo "Copying cv.pdf..."
	@@cp ./cv-pdf/cv.pdf ./cv.pdf

build: less render minify cv-pdf

dev-build: less render cv-pdf

deploy: build
	@@echo 'Deploying site.'
	@@rsync -avq --delete-after _site/ han:/var/www/florianeckerstorfer.com

.PHONY: server render dev-build build less minify deploy cv-pdf
