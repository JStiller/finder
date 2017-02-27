'use strict';
var businessLogic = function(finder) {
    var definitionLists = document.querySelectorAll('dl');
    finder.index(definitionLists);

    function _hide(node) {
        if(!node['reference'].classList.contains('hidden')) {
            node['reference'].classList.add('hidden');
        }
    }

    function _show(node) {
        if(node['reference'].classList.contains('hidden')) {
            node['reference'].classList.remove('hidden');
        }
    }

    function search(keyword) {
        var regEx = new RegExp('(' + keyword + ')', 'i');
        var show = finder.search(regEx, true);
        var hide = finder.search(regEx, false);

        show.forEach(function(nodeList) {
            nodeList[1].forEach(function(node) {
                _show(node);
                node['reference'].innerHTML = node['reference'].innerText.replace(regEx, '<mark>$1</mark>');
            });
        }, this);

        hide.forEach(function(nodeList) {
            nodeList[1].forEach(function(node) {
                _hide(node);
            });
        }, this);
    }

    return {
        search: search
    }
}

var test = new finder();
var testb = new businessLogic(test);