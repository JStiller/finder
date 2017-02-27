var dom = {
    hide: function(node) {
        if(!node.classList.contains('hidden')) {
            node.classList.add('hidden');
        }
    },
    show: function(node) {
        if(node.classList.contains('hidden')) {
            node.classList.remove('hidden');
        }
    }
};