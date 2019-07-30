function dom(dependency) {
    function hide(node) {
        if (!node.classList.contains('hidden')) {
            node.classList.add('hidden');
        }
    }

    function show(node) {
        if (node.classList.contains('hidden')) {
            node.classList.remove('hidden');
        }
    }

    /**
     * Returns a node or list of nodes by the delivered selection
     *
     * @param {string} deliveredSelection
     * @param {object} deliveredSettings
     * @return {object}
     */
    function find(deliveredSelection, deliveredSettings) {
        if (typeof deliveredSelection !== 'string') {
            throw new TypeError();
        }

        if(deliveredSelection.length <= 0) {
            throw new Error('missing selector');
        }

        const defaultSettings = {
            quantity: 'one',
            context: document,
        };
        const estimatedSettings = deliveredSettings ? Object.assign({}, defaultSettings, deliveredSettings) : defaultSettings;

        if (estimatedSettings.quantity === 'one') {
            return estimatedSettings.context.querySelector(deliveredSelection);
        } else if (estimatedSettings.quantity === 'all') {
            return Array.prototype.slice.call(estimatedSettings.context.querySelectorAll(deliveredSelection));
        }

        throw new Error('missing or unkown quantity');
    }

    return {
        hide,
        show,
        find
    }
};

export default dom;
