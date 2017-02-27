'use strict';
var businessLogic = function(finder) {
    var definitionLists = document.querySelectorAll('dl');
    finder.index(definitionLists);

    function search(keyword) {
        var regEx = new RegExp('(' + keyword + ')', 'i');
        var show = finder.search(regEx, true);
        var hide = finder.search(regEx, false);

        show.forEach(function(nodeList) {
            nodeList[1].forEach(function(node) {
                dom.show(node['reference']);
                node['reference'].innerHTML = node['reference'].innerText.replace(regEx, '<mark>$1</mark>');
            });
        }, this);

        hide.forEach(function(nodeList) {
            nodeList[1].forEach(function(node) {
                dom.hide(node['reference']);
            });
        }, this);
    }

    return {
        search: search
    }
}

var test = new finder();
var testb = new businessLogic(test);