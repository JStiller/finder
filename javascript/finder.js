function finder(dependency) {
    const elements = new Map();
    function index(definitionListNodes) {
        for(let i = 0; i < definitionListNodes.length; i++) {
            let parent = dependency.dom.find('dd', {
                context: definitionListNodes[i],
                quantity: 'all'
            });
            for(let j = 0; j < parent.length; j++) {
                // _setElement(parent[j], null);
                let child = dependency.dom.find('dt', {
                    context: definitionListNodes[i],
                    quantity: 'all'
                });
                for(let k = 0; k < child.length; k++) {
                    _setElement(child[k], parent[j]);
                    // console.log(child[k], parent[j]);
                }
            }
        }
    }

    function _setElement(newElement, parent) {
        if(elements.has(newElement.innerText)) {
            // console.log("known", newElement);
            let knownElements = elements.get(newElement.innerText);
            let add = true;
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
        let results = Array.from(elements);

        return results.filter(function(result) {
            let subject = result[0];
            if(subject.search(regEx) == -1) {
                return !match;
            }

            return match;
        });
    }

    return {
        index,
        search
    }
};

export default finder;