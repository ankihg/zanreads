(function(module) {

  indexController = {};

  indexController.index = function(ctx, next) {
    Post.fetchAll(init);
  };

  function init() {
    console.log('init');
    menuTree.makeElements();
    Tree.generate();
    Flock.setListeners();
    Fog.init();
    Moon.init();
  };






  module.indexController = indexController;
})(window);
