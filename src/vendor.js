'use strict';

/**
 * Include packages in the build. This will pull in the "main" .js file referenced in
 * package.json for each package referenced here.
 */
require('jquery');

// Workaround for Bootstrap. See http://stackoverflow.com/a/28884022/83897.
global.jQuery = require('jquery');

require('handlebars');
require('backbone');
require('bootstrap');
