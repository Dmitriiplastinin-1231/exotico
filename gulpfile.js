const { src, dest, watch, parallel, series } = require('gulp');

const scss 	 		= require('gulp-sass')(require('sass'));
const concat 		= require('gulp-concat');
const autoprefixer  = require('gulp-autoprefixer');
const del           = require('del');
const browserSync   = require('browser-sync').create();


function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		},
		notofy: false
	})
}

function styles() {
	return src('app/scss/style.scss')
		.pipe(scss({outputStyle: 'expanded'}))
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}



function cleanDist() {
	return del('dist')
}

function watching() {
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js']).on('change', browserSync.reload);
	watch(['app/**/*.html']).on('change', browserSync.reload)

}


exports.styles = styles;
exports.browsersync = browsersync;
exports.watching = watching;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist);

exports.default = parallel(styles, browsersync, watching);