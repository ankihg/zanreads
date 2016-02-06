(function(module) {

  indexController = {};
  indexController.isInit = false;

  indexController.index = function(ctx, next) {
    ui();
    Post.fetchAll(init);
  };

  function init() {
    if (!indexController.isInit) {
      console.log('init');
      menuTree.makeElements();
      Tree.generate();
      Flock.setListeners();
      Fog.init();
      Moon.init();
      indexController.isInit = true;
    }
  };

  function ui() {
    $('#post-page-wrap').hide();

    $('#canvasWrap').show();
  };



  module.indexController = indexController;
})(window);
