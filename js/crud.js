var Crud = React.createClass({
  render: function() {
    return (
      <main>
        <ReviewsList reviews={this.state.data} updateReview={this.updateReview}/>
        <form id='new-post-form' method="post" action="/projects">
          title:<br/>
          <input type="text" name="title" /><br/>
          author:<br/>
          <input type="text" name="author" /><br/>
          img url:<br/>
          <input type="text" name="imgSrc" /><br/>
          post:<br/>
          <input type="text" name="body" /><br/>
          <input type="submit" value="submit" />
        </form>
      </main>
    )
  },
  getInitialState: function() {
    return {data: []}
  },
  componentDidMount:  function() {
    this.getAllReviews();
  },
  getAllReviews: function() {
    $.ajax({
      url: '/reviews',
      dataType: 'json',
      success: function(res) {
        this.setState({data:res.data});
      }.bind(this),
      error: function(err) {
        console.log(err.responseText);
        console.log('error getting reviews', err);
      }
    })
  },
  updateReview: function(review) {
    $.ajax({
      url: '/reviews/'+review.title.replace(/ /g, '_'),
      dataType: 'json',
      type: 'PUT',
      success: function(res) {
        this.state.data = this.state.data.map(function(d) {
          return (d.title === data.title) ? data : d;
        });
        this.setState({data: this.state.data});
      }.bind(this),
      error: function(err) {
        console.log(err.responseText);
        console.log('error getting reviews', err);
      }
    });
  },
  deleleteReview: function() {

  }
});

var ReviewsList = React.createClass({
  render: function() {
    var reviewNodes = this.props.reviews.map(function(review) {
      return <Review review={review} updateReview={this.props.updateReview}/>
    }.bind(this));
    return (
      <section>
        {reviewNodes}
      </section>
    )
  }
});

var Review = React.createClass({
  render: function() {
    return (
      <div>
        <img src={this.props.review.imgSrc} style={{width:'10%'}}/>
        {this.props.review.title} <small>by</small> {this.props.review.author}
        <button onClick={this.showUpdateForm}>update</button>
        <button onClick={''}>delete</button>
      </div>
    )
  },
  showUpdateForm: function() {
     console.log('show update form');
  }
});

ReactDOM.render(
  <Crud />,
  document.getElementById('crud')
);
