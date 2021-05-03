# Pressed in Thyme #

A website built using a static website generator.

## Description ##

The Pressed in Thyme website is built using a static website generator which takes the website source files and manipulates them to create the HTML and other assets used for the static website. The static website generator can be used as a starting point for a static generated site or just serve as an example of how a site of this type can be done.

## Features ##

* Gulp.js task runner for automation
* Uses Bulma CSS framework
* Panini flat file generator for compiling HTML and layouts into HTML pages
* Templating using Handlebars
* SASS to CSS conversion
* CSS Autoprefixing
* Sitewide CSS and JavaScript output to single files
* CSS and JavaScript file minification
* Choose Bulma CSS components to use in project
* The only JavaScript is for the navbar
* Babel for backwards compatible JavaScript conversion
* Watch for file changes to recompile
* Live reload browser with BrowserSync

## How to use ##

As a prerequisite node.js must be installed on the computer. Node.js installers can be found at https://nodejs.org and version 8 or later is recommended. Gulp version 4 or later is required.

1. Install Gulp-cli.
```
npm install -g gulp-cli
```
2. Download the zip from this GitHub repository, unzip it, rename the folder to what you want and move the folder to where you to use it.
3. Open a command prompt/terminal and cd to the folder. The gulp plugins and their dependencies first need to be installed.
```
npm install
```
After this is complete the gulp tasks can be run.
```
gulp build  //compiles and copies everything to the destination folder
gulp        //builds and runs the server
clean       //separate task to delete the destination folder only when wanted
```

For the default gulp task a browser should open with the Pressed in Thyme site.

## Live website ##

The website generated by this static website generator is at https://pressed-in-thyme.com

## Changelog ##

### 1.3.0 ###
* Updated all devDependencies to latest versions

### 1.2.1 ###
* Changed Font Awesome icons to use Bulma's new icon-text wrapper

### 1.2.0 ###
* Updated Bulma version to 0.9.2
* Updated Bulmajs version to 0.12.1

### 1.1.5 ###
* Moved bulma and bulmajs from devDependencies to dependencies in package.json
* Updated gulp plugin dependencies

### 1.1.4 ###
* Updated gulp plugin dependencies
* Correct typo in copyright
* Added skip to content for screen readers

### 1.1.3 ###
* Updated gulp plugin dependencies

### 1.1.2 ###
* Updated gulp plugin dependencies

### 1.1.1 ###
* Changed variable $font-family-serif to Bulma $family-secondary

### 1.1.0 ###
* Updated Bulma version to 0.8.0

### 1.0.4 ###
* Updated gulp plugin dependencies

### 1.0.3 ###
* Added year Handlebars helper and used in footer

### 1.0.2 ###
* Added LICENSE.txt

### 1.0.1 ###
* Added README.md

### 1.0.0 ###
* Initial release
