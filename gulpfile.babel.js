/**
* Gulp file for Pressed in Thyme site
*/
'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import panini        from 'panini';
import rimraf        from 'rimraf';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import rename        from 'gulp-rename';
import autoprefixer  from 'autoprefixer';

// Load all Gulp plugins into one variable
const $ = plugins();

// Your project's server will run on localhost:xxxx at this port
const PORT = '8000';

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Set source paths
const SRCLOC = 'src/';
const SRCPATH = {
    root: SRCLOC,
    css: SRCLOC + 'scss/app.scss',
    sass: 'node_modules/bulma/sass',
    img: SRCLOC + 'img/**/*.{png,jpg,gif,svg}',
    html: SRCLOC + 'pages/**/*.{html,hbs}',
    misc: SRCLOC + 'misc/favicon.ico',
    jsentries: SRCLOC + 'js/app.js'
};

// Set destination paths
const APPLOC = 'dist';
const APPPATH = {
    root: APPLOC,
    css: APPLOC + '/assets/css',
    img: APPLOC + '/assets/img',
    js: APPLOC + '/assets/js'
};

// Build the destination folder by running all of the below tasks
gulp.task('build',
    gulp.series(gulp.parallel(pages, javascript, images, copy, sass), cssmin, javascriptmin));

// Build the site, run the server, and watch for file changes
gulp.task('default',
    gulp.series('build', server, watch));

// Run clean as separate task
gulp.task('clean',
    gulp.series(clean));

// Delete the destination folder
function clean(done) {
    rimraf(APPPATH.root, done);
}

// Copy miscellaneous files which are in root level of destination
function copy() {
    return gulp.src(SRCPATH.misc)
        .pipe(gulp.dest(APPPATH.root));
}

// Copy page templates into finished HTML files
function pages() {
    return gulp.src(SRCPATH.html)
        .pipe(panini({
            root: SRCPATH.root + 'pages/',
            layouts: SRCPATH.root + 'layouts/',
            partials: SRCPATH.root + 'partials/',
            data: SRCPATH.root + 'data/',
            helpers: SRCPATH.root + 'helpers/'
        }))
    // Correct output file extension for .hbs files
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest(APPPATH.root));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
    panini.refresh();
    done();
}

// Compile Sass into CSS and generate sourcemaps
function sass() {
    const postCssPlugins = [
        autoprefixer(),
    ].filter(Boolean);
    return gulp.src(SRCPATH.css)
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: SRCPATH.sass
        })
            .on('error', $.sass.logError))
        .pipe($.postcss(postCssPlugins))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(APPPATH.css))
        .pipe(browser.reload({ stream: true }));
}

// Also create minified css file from generated css file
function cssmin() {
    return gulp.src(APPPATH.css + '/app.css')
        .pipe($.cleanCss({ compatibility: 'ie9' }))
        .pipe($.rename({ extname: '.min.css' }))
        .pipe(gulp.dest(APPPATH.css));
}

let webpackConfig = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ],
                        compact: false
                    }
                }
            }
        ]
    },
    devtool: 'source-map'
};

// Combine JavaScript into one file
function javascript() {
    return gulp.src(SRCPATH.jsentries)
        .pipe(named())
        .pipe($.sourcemaps.init())
        .pipe(webpackStream(webpackConfig, webpack2))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(APPPATH.js));
}

// Also create minified js file from generated js file
function javascriptmin() {
    return gulp.src(APPPATH.js + '/app.js')
        .pipe($.uglify()
            .on('error', e => { console.log(e); })
        )
        .pipe($.rename({ extname: '.min.js' }))
        .pipe(gulp.dest(APPPATH.js));
}

// Copy images to the destination folder
function images() {
    return gulp.src(SRCPATH.img)
        .pipe(gulp.dest(APPPATH.img));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
    browser.init({
        server: APPPATH.root, port: PORT
    }, done);
}

// Reload the browser with BrowserSync
// function reload(done) {
//     browser.reload();
//     done();
//}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
    gulp.watch(SRCPATH.root + 'pages/**/*.html').on('all', gulp.series(pages, browser.reload));
    gulp.watch(SRCPATH.root + '{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
    gulp.watch(SRCPATH.root + 'data/**/*.{js,json,yml}').on('all', gulp.series(resetPages, pages, browser.reload));
    gulp.watch(SRCPATH.root + 'helpers/**/*.js').on('all', gulp.series(resetPages, pages, browser.reload));
    gulp.watch(SRCPATH.root + 'scss/**/*.scss').on('all', sass);
    gulp.watch(SRCPATH.root + 'js/**/*.js').on('all', gulp.series(javascript, browser.reload));
    gulp.watch(SRCPATH.root + 'img/**/*').on('all', gulp.series(images, browser.reload));
}
