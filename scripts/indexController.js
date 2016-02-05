(function(module) {

  indexController = {};

  indexController.index = function(ctx, next) {
    ui();
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

  function ui() {
    $('#post-page-wrap').hide();

    $('#canvasWrap').show();
  };



  module.indexController = indexController;
})(window);
