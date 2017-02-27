'use strict';
var finder = function() {
    var elements = new Map();
    function index(definitionListNodes) {
        for(var i = 0; i < definitionListNodes.length; i++) {
            var parent = helper.querySelectorAll('dd', definitionListNodes[i]);
            for(var j = 0; j < parent.length; j++) {
                // _setElement(parent[j], null);
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