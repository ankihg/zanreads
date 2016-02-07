(function(module) {

  var postController = {};


  postController.index = function(ctx, next) {
    ui();
    var post = Post.getByID(ctx.params.id);
    console.log(post);
    post.toPageHTML();
    makeHomeLink();
    makeCatalogLink();
    setClickTextDivColor();
  };

  function ui() {
    $('#canvasWrap').hide();

    $('#post-page-wrap').show();
  };

  function makeHomeLink() {
    var link = {
      title: "<br><br>home",
      url: "/"
    }
    var template = Handlebars.compile($('#ghost-link-template').text());
    var html = template(link);

    $('#home-link').append(html);
  };

  function makeCatalogLink() {
    var link = {
      title: "<br><br>catalog",
      url: "/catalog"
    }
    var template = Handlebars.compile($('#ghost-link-template').text());
    var html = template(link);

    $('#catalog-p-link').append(html);
  };

function setClickTextDivColor() {
  $('#textDiv').on('click', function() {
    var background;
    var color;

    var r = Math.random()*10;

    if (r < 2) {
    background = "#000000";
    color = "#FFFFFF";
    } else if (r < 3) {
    background = "#ffff00";
    color = "#023ef2";
    } else if (r < 4) {
    background = "#00ff00";
    color = "#ff0000";
    } else if (r < 5) {
    background = "#ff0000";
    color = "#00ff00";
    } else if (r < 6) {
    background = "#023ef2";
    color = "#ffff00";
    } else {
    background = "#FFFFFF";
    color = "#000000";
    }

    $(this).css('background-color', background);
    $(this).css('color', color);

  });
}


  module.postController = postController;
})(window);
