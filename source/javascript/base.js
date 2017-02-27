'use strict';
var businessLogic = function(finder) {
    var definitionLists = document.querySelectorAll('dl');
    finder.index(definitionLists);

    function search(inputKeyword) {
        var expression = '.*';
        inputKeyword.split(' ').forEach(function(keywordPart) {
            expression = expression.concat('(' + keywordPart + ').*');
        });
        var regEx = new RegExp(expression, 'i');
        var show = finder.search(regEx, true);
        var hide = finder.search(regEx, false);

        show.forEach(function(nodeList) {
            nodeList[1].forEach(function(node) {
                dom.show(node['reference']);
                var matches = node['reference'].firstChild.innerText.match(regEx);
                if(Array.isArray(matches) === true && matches.length > 1) {
                    var text = node['reference'].firstChild.innerText;
                    matches.shift();
                    matches.forEach(function(match) {
                        if(match.length > 0) {
                            text = text.replace(match, '<mark>' + match + '</mark>')
                        }
                    });
                    node['reference'].firstChild.innerHTML = text;
                }
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