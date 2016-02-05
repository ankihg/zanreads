(function(module) {

var Post = function(tmp) {
  this.title = tmp.title;
  this.author = tmp.author;
  this.imgSrc = tmp.imgSrc;
  this.url = tmp.url;
  this.body = tmp.body;
  console.log(this.title);
};

Post.all = [];

Post.loadAll = function(rawData) {
  Post.all = rawData.map(function(tmp) {
    return new Post(tmp);
  });
};

Post.fetchAll = function(callNext) {
  console.log('fetch all');
  if (localStorage.reviewData) {
    console.log('load from storage');
    Post.checkUpdate(); //checks if needs update, calls loadAll() either way
    callNext();
  } else {
      Post.update();
      callNext();
  }
};

Post.update = function() {
 $.getJSON('/data/reviews.json', function(data, message, xhr) {
    Post.loadAll(data);
    localStorage.reviewData = JSON.stringify(data);
    localStorage.reviewEtag = xhr.getResponseHeader('eTag');
  });

};

Post.checkUpdate = function() {
  $.ajax({
  type: 'HEAD',
  url: "/data/reviews.json",
  complete: function(data) {
    var etag = data.getResponseHeader('eTag');
    if (localStorage.reviewEtag !== etag) {
      Post.update();
    } else {
      Post.loadAll(JSON.parse(localStorage.reviewData));
    }
  }
  });
};

module.Post = Post;
})(window);
