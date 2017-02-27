'use strict';
var helper = {
    querySelectorAll: function(selector, domFragment) {
        var nodes = domFragment.querySelectorAll(selector),
            results = [];

        for(var i = 0; i < nodes.length; i++) {
            results.push(nodes[i]);
        }

        return results;
    }
}