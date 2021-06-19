/*
Gulp 4 build flow
NPM Setup:
npm install gulp --global
npm install --save-dev gulp
npm install --save-dev gulp-sass
npm install --save-dev gulp-uglify
npm install --save-dev gulp-uglifycss
npm install --save-dev pump
npm install --save-dev gulp-babel@next @babel/core
*/

/*
This is a very basic gulp flow.
Transpiles SCSS from /scss to CSS in /src_css
Minifies CSS from /src_css to /css
Minifies JS from /src_js to /js
Can watch SCSS for changes and transpile
*/


/* requires */
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const pump = require('pump');
const babel = require("gulp-babel");


/* functions */

/*
Transpile SCSS from /scss into CSS and place in /src_css
*/
const transpilescss = () => {
    return src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(dest('./src_css'));
};


/*
Transpile >=ES6 from /e6js into JS and place in /src_js
*/
const transpilejs = () => {
  return src('./es6/**/*.js')
    .pipe(babel())
    .pipe(dest('./src_js'));
};


/*
Minify CSS from /src_css and place in /css
*/
const compresscss = () => {
  return src('./src_css/**/*.css')
    .pipe(uglifycss({
      "maxLineLen": 0,
      "uglyComments": true
    }))
    .pipe(dest('./css'));
};

/*
  Minify the JS file
*/
const compressjs = () => {
  return pump([
    src('./wp-content/themes/wendyrosoff-02/std_js/**/*.js'),
    uglify(),
    dest('./wp-content/themes/wendyrosoff-02/js')
  ])
};

/*
  Create or update distribution folder.
  'base' sets file folder level to project root.
*/
const distfiles = () => {
    return src([
      'index.html',  
      './about/*.html', 
      './css/*.css', 
      './directions-and-delivery/*.html', 
      './disclaimer/*.html', 
      './images/*.jpg', 
      './js/*.js',
      './menu/*.html', 
      './menu_images/*.jpg', 
      './page_images/*.svg', 
      './page_images/*.png', 
      './page_images/*.jpg' 
      ], 
      {base: './'})
    .pipe(dest('./dist'));
}

/*
Transpile the SCSS
Minify the CSS
Minify the JS
*/
exports.all = series(transpilescss, transpilejs, compresscss, compressjs, distfiles);

