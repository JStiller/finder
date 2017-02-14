'use strict'
var base = function() {
    var elements = new Map();
    function getDefinitionLists(definitionListNodes) {
        for(var i = 0; i < definitionListNodes.length; i++) {
            var parent = definitionListNodes[i].querySelector('dd');
            _setElement(parent, null);
            var child = definitionListNodes[i].querySelectorAll('dt');
            for(var j = 0; j < child.length; j++) {
                _setElement(child[j], parent);
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
        elements.forEach(function(value, key) {
            if(key.search(keyword) == -1) {
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

                    node['reference'].innerHTML = node['reference'].innerText.replace(keyword, '<mark>' + keyword + '</mark>');
                });
            }
        });
    }

    return {
        getDefinitionLists: getDefinitionLists,
        search: search
    }
}

var test = new base();
var definitionLists = document.querySelectorAll('dl');
test.getDefinitionLists(definitionLists);