(function(module) {

  var newPostController = {};

  $( "#new-post-form" ).submit(function( event ) {
    console.log( "Handler for .submit() called." );
    event.preventDefault();

    // var data = $(this).serializeArray().reduce(function(obj, item) {
    //     obj[item.name] = item.value;
    //     return obj;
    // }, {});
    // // var data = $(this).serialize();
    //
    //
    // console.log(JSON.stringify(data));
    // putNewPost(data);
  });

  function putNewPost(data) {
    var reviews = JSON.parse(localStorage.reviewData);
    reviews.push(data);
    localStorage.reviewData = JSON.stringify(reviews);
    console.log(localStorage.reviewData);

    // $.post('/data/reviews2.json', localStorage.reviewData, function() {
    //   console.log('load successfull');
    // });

    // $.ajax({
    //   url: '/data/reviews2.json',
    //   type: 'PUT',
    //   data: localStorage.reviewData,
    //   success: function(data) {
    //     console.log('Load was performed: '+data);
    //   }
    // });

    $.ajax({
      url: '/data/reviews2.json',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data){
          alert(data);
      }
      });
  };

  module.newPostController = newPostController;
})(window);
