'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({
    // This ensures that everything is properly cleaned up when a view is destroyed.
    // We want to remove HTML elements associated with the view from the DOM, and we
    // want to ensure that any event listeners are removed.
    close: function() {
        this.remove();
        this.unbind();
        this.stopListening();
    }
});