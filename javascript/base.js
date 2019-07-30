import finder from './finder';
import dom from './dom';

const businessLogic = function(dependency) {
    const estimatedLists = dependency.dom.find('dl', {
        quantity: 'all'
    });
    dependency.finder.index(estimatedLists);

    function search(deliveredKeyword) {
        let expression = '.*';
        deliveredKeyword.split(' ').forEach(function(keywordPart) {
            expression = expression.concat('(', keywordPart, ').*');
        });
        const regEx = new RegExp(expression, 'i');
        const show = dependency.finder.search(regEx, true);
        const hide = dependency.finder.search(regEx, false);

        show.forEach(function(nodeList) {
            nodeList[1].forEach(function(node) {
                dependency.dom.show(node['reference']);
                const matches = node['reference'].firstChild.innerText.match(regEx);
                if(Array.isArray(matches) === true && matches.length > 1) {
                    let text = node['reference'].firstChild.innerText;
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
                dependency.dom.hide(node['reference']);
            });
        }, this);
    }

    return {
        search: search
    }
}

const base = new businessLogic({
    finder: new finder({
        dom: new dom()
    }),
    dom: new dom()
});

const estimatedSearchInput = new dom().find('input[type=search]');
estimatedSearchInput.addEventListener('keyup', function(event) {
    base.search(event.target.value);
})