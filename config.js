module.exports = {
	// Project options.
	projectURL: 'http://localhost/binary-clock', // Real URL
	productURL: './', // Root folder
	browserAutoOpen: true,
	injectChanges: true,

	// CSS Custom options.
	cssCustomSRC: './assets/css/custom/custom.scss', // Path to main .scss file.
	cssCustomDestination: './assets/css/', // Path to place the compiled CSS file. Default set to root folder.

	outputStyle: 'compact', // Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
	errLogToConsole: true,
	precision: 10,

	// CSS Vendor options.
	cssVendorSRC: './assets/css/vendor/*.css',
	cssVendorDestination: './assets/css/',
	cssVendorFile: 'vendor',

	// JS Vendor options.
	jsVendorSRC: './assets/js/vendor/*.js', // Path to JS vendor folder.
	jsVendorDestination: './assets/js/', // Path to place the compiled JS vendors file.
	jsVendorFile: 'vendor', // Compiled JS vendors file name. Default set to vendors i.e. vendors.js.

	// JS Custom options.
	jsCustomSRC: './assets/js/custom/*.js', // Path to JS custom scripts folder.
	jsCustomDestination: './assets/js/', // Path to place the compiled JS custom scripts file.
	jsCustomFile: 'custom', // Compiled JS custom file name. Default set to custom i.e. custom.js.

	// Images options.
	imgSRC: './assets/images/', // Destination folder of optimized images. Must be different from the imagesSRC folder.

	// Watch files paths.
	watchCssCustom: './assets/css/custom/**/*.scss', // Path to all *.scss files inside css folder and inside them.
	watchCssVendor: './assets/css/vendor/*.css',
	watchJsVendor: './assets/js/vendor/*.js', // Path to all vendor JS files.
	watchJsCustom: './assets/js/custom/*.js', // Path to all custom JS files.
	watchPhp: './**/*.php', // Path to all PHP files.
	watchHtml: './**/*.html', // Path to all PHP files.

	// Browsers you care about for autoprefixing. Browserlist https://github.com/ai/browserslist
	// The following list is set as per WordPress requirements. Though, Feel free to change.
	BROWSERS_LIST: [
		'last 2 version',
		'> 1%',
		'ie >= 11',
		'last 1 Android versions',
		'last 1 ChromeAndroid versions',
		'last 2 Chrome versions',
		'last 2 Firefox versions',
		'last 2 Safari versions',
		'last 2 iOS versions',
		'last 2 Edge versions',
		'last 2 Opera versions'
	]
};