'use strict';

// Bulk require the remaining client app dependencies. Note that this
// leverages require-globify as a Browserify transform.
require('./models/*.js', {mode: 'expand'});
require('./routers/*.js', {mode: 'expand'});
require('./views/*.js', {mode: 'expand'});
require('./templates/*.html', {mode: 'expand'});

// Pull in references to libaries we need.
var $ = require('jquery');
var Backbone = require('backbone');
var AppRouter = require('./routers/app');

// Note this is a shortcut for $(document).ready(function() { ... });
$(function() {
    // Initialize the router.
    new AppRouter();

    // Initialize history mangement.
    Backbone.history.start({pushState: true});

    // Hijack relative links to use Backbone router.
    // SOURCE: https://gist.github.com/tbranyen/1142129
    if (Backbone.history && Backbone.history._hasPushState) {
        // Use delegation to avoid initial DOM selection and allow all matching elements to bubble.
        $(document).delegate('a', 'click', function(event) {
            // Get the anchor href and protocol.
            var href = $(this).attr('href');
            var protocol = this.protocol + '//';

            // Ensure the protocol is not part of the URL, meaning it's relative.
            // Stop the event bubbling to ensure the link will not cause a page refresh.
            if (href.slice(protocol.length) !== protocol && href !== '#' && !href.match(/http:\/\//)) {
                event.preventDefault();

                // Note by using Backbone.history.navigate, router events will not be
                // triggered. If this is a problem, change this to navigate on your router.
                Backbone.history.navigate(href, true);
            }
        });
    }
});

// Monkey patch to ensure model.toJSON() includes models and collections in attributes.
Backbone.Model.prototype.toJSON = function() {
  return JSON.parse(JSON.stringify(this.attributes));
};
