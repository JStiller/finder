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

var finder = function() {
    var elements = new Map();
    function index(definitionListNodes) {
        for(var i = 0; i < definitionListNodes.length; i++) {
            var parent = helper.querySelectorAll('dd', definitionListNodes[i]);
            for(var j = 0; j < parent.length; j++) {
                _setElement(parent[j], null);
                var child = helper.querySelectorAll('dt', definitionListNodes[i]);
                for(var k = 0; k < child.length; k++) {
                    _setElement(child[k], parent[j]);
                    // console.log(child[k], parent[j]);
                }
            }
        }
    }

    function _setElement(newElement, parent) {
        if(elements.has(newElement.innerText)) {
            // console.log("known", newElement);
            var knownElements = elements.get(newElement.innerText);
            var add = true;
            knownElements.forEach(function(element) {
                // console.log("element['reference']: ", element['reference'], "knownElements :", newElement, element['reference'] == newElement);
                if(element['reference'] == newElement) {
                    add = false;
                    // console.log("none");
                    // node['keywords'] = element['keywords'];
                    // node['childs'] = element['childs'];
                }
            }, this);

            if(add == true) {
                // console.log("pushed", newElement);
                knownElements.push({
                    "reference": newElement
                    // "keywords": [],
                    // "childs": new Map()
                });
            }
        } else {
            // console.log("added", newElement);
            elements.set(newElement.innerText, [{
                "reference": newElement
                // "keywords": [],
                // "childs": new Map()
            }]);
        }
    }

    function search(regEx, match) {
        var results = Array.from(elements);

        return results.filter(function(result) {
            var subject = result[0];
            if(subject.search(regEx) == -1) {
                return !match;
            }

            return match;
        });
    }

    return {
        index: index,
        search: search
    }
}

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