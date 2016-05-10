var Crud = React.createClass({
  render: function() {
    return (
      <main>
        <ReviewsList reviews={this.state.data} updateReview={this.updateReview} deleteReview={this.deleteReview}/>
        <CreateReviewForm createReview={this.createReview}/>
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
  createReview: function(review) {
    console.log(review);
    $.ajax({
      url: '/reviews',
      dataType: 'json',
      type: 'POST',
      data: review,
      success: function(res) {
        this.state.data.push(res.data);
        this.setState({data: this.state.data});
      }.bind(this),
      error: function(err) {
        console.log(err.responseText);
        console.log('error getting reviews', err);
      }
    });
  },
  updateReview: function(review) {
    $.ajax({
      url: '/reviews/'+review.title.replace(/ /g, '_'),
      contentType: 'application/json',
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
  deleteReview: function(review) {
    $.ajax({
      url: '/reviews/'+review.title.replace(/ /g, '_'),
      type: 'DELETE',
      success: function(res) {
        this.state.data = this.state.data.filter(function(data) {
          return data.title != review.title;
        })
        this.setState({data: this.state.data});
      }.bind(this),
      error: function(err) {
        console.log(err.responseText);
        console.log('error getting reviews', err);
      }
    });
  }
});

var ReviewsList = React.createClass({
  render: function() {
    var reviewNodes = this.props.reviews.map(function(review) {
      return <Review review={review} updateReview={this.props.updateReview} deleteReview={this.props.deleteReview}/>
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
        <button onClick={this.deleteMe}>delete</button>
      </div>
    )
  },
  showUpdateForm: function() {
     console.log('show update form');
  },
  deleteMe: function() {
    this.props.deleteReview(this.props.review);
  }
});

var CreateReviewForm = React.createClass({
  render: function() {
    return (
      <div>
        create a review
        <form id='new-post-form' onSubmit={this.handleSubmit}>
          title:<br/>
          <input type="text" value={this.state.title} onChange={this.handleTitle}/><br/>
          author:<br/>
          <input type="text" value={this.state.author} onChange={this.handleAuthor} /><br/>
          img url:<br/>
          <input type="text" value={this.state.imgSrc} onChange={this.handleImgSrc}/><br/>
          post:<br/>
          <input type="text" value={this.state.body} onChange={this.handleBody} /><br/>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  },
  getInitialState: function() {
    return {title: '', author: '', imgSrc: '', body: ''};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var author = this.state.author.trim();
    var imgSrc = this.state.imgSrc.trim();
    var body = this.state.body.trim();

    var it = {hajlp: 'plz'};
    console.log(it.hajlp);
    this.props.createReview({title: title, author: author, imgSrc: imgSrc, body: body});
    this.setState({title: '', author: '', imgSrc: '', body: ''});
  },
  handleTitle: function(e) {
    this.setState({title: e.target.value});
  },
  handleAuthor: function(e) {
    this.setState({author: e.target.value});
  },
  handleImgSrc: function(e) {
    this.setState({imgSrc: e.target.value});
  },
  handleBody: function(e) {
    this.setState({body: e.target.value});
  }
});

ReactDOM.render(
  <Crud />,
  document.getElementById('crud')
);
