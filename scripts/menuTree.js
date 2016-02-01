(function(module) {

var menuTree = {};

menuTree.makeClickEvents = function() {
  $('#books-link').on('click', function() {
    Tombstone.displayAll();
  });
};



module.menuTree = menuTree;
})(window);
