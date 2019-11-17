/*
* KONFIGURACJA NARZĘDZIA
*/

// Load Config
const config = require( './config.js' ); // Konfiguracja dla Gulpa !!! PAMIĘTAJ BY ZMIENIĆ !!!

// Load Gulp
const gulp = require("gulp"); // Well...

// Load CSS
const sass = require("gulp-sass"); // Przepisywanie SASS'ów na CSS
const minifycss = require( 'gulp-uglifycss' ); // Minifikacja CSS.
const autoprefixer = require("gulp-autoprefixer"); // Automatyczne vendor prefixes
const sassGlob = require('gulp-sass-glob'); // Wczytywanie całych katalogów w SASS

// Load JS
const concat = require("gulp-concat"); // Łączenie plików JS
const uglify = require("gulp-uglify"); // Minifikacja JS
const babel = require("gulp-babel"); // Kompilowanie ES do JS

// Load Others
const rename = require( 'gulp-rename' ); // Zmiana nazw plików
const lineec = require( 'gulp-line-ending-corrector' ); // Utrzymanie line endings
const browserSync = require("browser-sync").create(); // Odświeżanie strony i przemycanie CSS
const plumber = require( 'gulp-plumber' ); // Nie wyłącza Gulpa przy błędach w skrypcie
const del = require("del"); // Usuwanie plików
const notify = require( 'gulp-notify' ); // Powiadomienia Gulp
const filter = require( 'gulp-filter' ); // Filtrowanie plików w streamie

/*
* TASKI DEVELOPERSKIE
*/

// Wyświetlanie powiadomień o błędach
const errorHandler = r => {
	notify.onError( '\n\n❌  ===> ERROR: <%= error.message %>\n' )( r );
};

// Livereload, przekazywanie css, proxy
const browsersync = done => {
	browserSync.init({
		proxy: config.projectURL,
		open: config.browserAutoOpen,
		injectChanges: config.injectChanges,
		watchEvents: [ 'change', 'add', 'unlink', 'addDir', 'unlinkDir' ]
	});
	done();
};

// Odświeżanie strony
const reload = done => {
	browserSync.reload();
	done();
};

// Obsługa CSS'ów
gulp.task( 'customCSS', () => {
	return gulp
		.src( config.cssCustomSRC, { allowEmpty: true })
		.pipe( sassGlob() )
		.pipe( plumber( errorHandler ) )
		.pipe(
			sass({
				errLogToConsole: config.errLogToConsole,
				outputStyle: config.outputStyle,
				precision: config.precision
			})
		)
		.on( 'error', sass.logError )
		.pipe( autoprefixer( config.BROWSERS_LIST ) )
		.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
		.pipe( gulp.dest( config.cssCustomDestination ) )
		.pipe( filter( '**/*.css' ) ) // Filtering stream to only css files.
		.pipe( browserSync.stream() ) // Reloads style.css if that is enqueued.
		.pipe( rename({ suffix: '.min' }) )
		.pipe( minifycss({ maxLineLen: 10 }) )
		.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
		.pipe( gulp.dest( config.cssCustomDestination ) )
		.pipe( filter( '**/*.css' ) ) // Filtering stream to only css files.
		.pipe( browserSync.stream() ) // Reloads style.min.css if that is enqueued.
		// .pipe( notify({ message: '\n\n✅  ===> CUSTOM CSS — completed!\n', onLast: true }) );
});

gulp.task( 'vendorsCSS', () => {
	return gulp
		.src( config.cssVendorSRC, { allowEmpty: true } ) // Only run on changed files.
		.pipe( plumber( errorHandler ) )
		.pipe( concat( config.cssVendorFile + '.css' ) )
		.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
		.pipe( gulp.dest( config.cssVendorDestination ) )
		.pipe(
			rename({
				basename: config.cssVendorFile,
				suffix: '.min'
			})
		)
		.pipe( gulp.dest( config.cssVendorDestination ) )
		// .pipe( filter( '**/*.css' ) ) // Filtering stream to only css files.
		.pipe( browserSync.stream() ) // Reloads style.min.css if that is enqueued.
		// .pipe( notify({ message: '\n\n✅  ===> VENDOR CSS — completed!\n', onLast: true }) );
});

// Obsługa zewnętrznych skryptów
gulp.task( 'vendorsJS', () => {
	return gulp
		.src( config.jsVendorSRC, { allowEmpty: true } ) // Only run on changed files.
		.pipe( plumber( errorHandler ) )
		.pipe(
			babel({
				presets: [
					[
						'@babel/preset-env', // Preset to compile your modern JS to ES5.
						{
							modules: false,
							targets: { browsers: config.BROWSERS_LIST } // Target browser list to support.
						}
					]
				]
			})
		)
		// .pipe( remember( config.jsVendorSRC ) ) // Bring all files back to stream.
		.pipe( concat( config.jsVendorFile + '.js' ) )
		.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
		.pipe( gulp.dest( config.jsVendorDestination ) )
		.pipe(
			rename({
				basename: config.jsVendorFile,
				suffix: '.min'
			})
		)
		.pipe( uglify() )
		.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
		.pipe( gulp.dest( config.jsVendorDestination ) )
		// .pipe( notify({ message: '\n\n✅  ===> VENDOR JS — completed!\n', onLast: true }) );
});

// Obsługa własnych skryptów
gulp.task( 'customJS', () => {
	return gulp
		.src( config.jsCustomSRC, { allowEmpty: true } ) // Only run on changed files.
		.pipe( plumber( errorHandler ) )
		.pipe(
			babel({
				presets: [
					[
						'@babel/preset-env', // Preset to compile your modern JS to ES5.
						{
							targets: { browsers: config.BROWSERS_LIST } // Target browser list to support.
						}
					]
				]
			})
		)
		// .pipe( remember( config.jsCustomSRC ) ) // Bring all files back to stream.
		.pipe( concat( config.jsCustomFile + '.js' ) )
		.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
		.pipe( gulp.dest( config.jsCustomDestination ) )
		.pipe(
			rename({
				basename: config.jsCustomFile,
				suffix: '.min'
			})
		)
		.pipe( uglify() )
		.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
		.pipe( gulp.dest( config.jsCustomDestination ) )
		// .pipe( notify({ message: '\n\n✅  ===> CUSTOM JS — completed!\n', onLast: true }) );
});

// Sprawdzaj zmiany plików
gulp.task(
	'default',
	gulp.parallel( 'customCSS', 'vendorsCSS', 'vendorsJS', 'customJS', browsersync, () => {
		gulp.watch( config.watchHtml, reload ); // Reload on PHP file changes.
		gulp.watch( config.watchPhp, reload ); // Reload on PHP file changes.
		gulp.watch( config.watchCssCustom, gulp.parallel( 'customCSS' ) ); // Reload on SCSS file changes.
		gulp.watch( config.watchCssVendor, gulp.series( 'vendorsCSS' ) ); // Reload on vendorsJS file changes.
		gulp.watch( config.watchJsVendor, gulp.series( 'vendorsJS', reload ) ); // Reload on vendorsJS file changes.
		gulp.watch( config.watchJsCustom, gulp.series( 'customJS', reload ) ); // Reload on customJS file changes.
		gulp.watch( config.imgSRC, gulp.series( reload ) ); // Reload on images file changes.
	})
);

/*
* TASKI PRODUKCYJNE
*/

gulp.task("clean", function() {
  return del(["dist/**/*"]);
});

gulp.task("move", function() {
  return gulp
    .src("*.+(png|xml|css|php|html|ico|jpg|svg|webmanifest|htaccess)")
    .pipe(gulp.dest("dist/"));
});

gulp.task("moveCSScustom", function() {
	return gulp
	  .src("assets/css/custom.min.css", { allowEmpty: true })
	  .pipe(gulp.dest("dist/assets/css"));
  });
  
  gulp.task("moveCSSvendor", function() {
	return gulp
	  .src("assets/css/vendor.min.css", { allowEmpty: true })
		.pipe(gulp.dest("dist/assets/css"));
  });

gulp.task("moveJScustom", function() {
  return gulp
    .src("assets/js/custom.min.js", { allowEmpty: true })
    // .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js"));
});

gulp.task("moveJSvendor", function() {
  return gulp
	.src("assets/js/vendor.min.js", { allowEmpty: true })
	// .pipe(uglify())
  	.pipe(gulp.dest("dist/assets/js"));
});

gulp.task("moveImages", function() {
  return gulp
    .src("assets/images/**/*")
    .pipe(gulp.dest("dist/assets/images"));
});

gulp.task("moveFonts", function() {
  return gulp
    .src(["assets/fonts/**/*"])
    .pipe(gulp.dest("dist/assets/fonts"));
});

gulp.task("moveInc", function() {
	return gulp
	  .src(["assets/inc/**/*"])
	  .pipe(gulp.dest("dist/assets/inc"));
  });

  gulp.task("moveSrc", function() {
	return gulp
	  .src(["assets/src/**/*"])
	  .pipe(gulp.dest("dist/assets/src"));
  });

gulp.task('build', gulp.series('clean', gulp.parallel("move","moveCSScustom","moveCSSvendor","moveJScustom","moveJSvendor","moveFonts","moveImages","moveInc","moveSrc")));
