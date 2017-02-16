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

var base = function() {
    var elements = new Map();
    function getDefinitionLists(definitionListNodes) {
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

    function search(keyword) {
        var regEx = new RegExp('(' + keyword + ')', 'i');

        elements.forEach(function(value, key) {
            if(key.search(regex) == -1) {
                value.forEach(function(node) {
                    if(!node['reference'].classList.contains('hidden')) {
                        node['reference'].classList.add('hidden');
                    }
                });
            } else {
                value.forEach(function(node) {
                    if(node['reference'].classList.contains('hidden')) {
                        node['reference'].classList.remove('hidden');
                    }

                    node['reference'].innerHTML = node['reference'].innerText.replace(regEx, '<mark>$1</mark>');
                });
            }
        }, this);
    }

    return {
        getDefinitionLists: getDefinitionLists,
        search: search
    }
}

var test = new base();
var definitionLists = document.querySelectorAll('dl');
test.getDefinitionLists(definitionLists);