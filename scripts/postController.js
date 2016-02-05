(function(module) {

  var postController = {};


  postController.index = function(ctx, next) {
    ui();
    var id = ctx.params.id;
    console.log(id);
  };

  function ui() {
    $('#canvasWrap').hide();

    $('#post-page-wrap').show();
  };


  module.postController = postController;
})(window);
