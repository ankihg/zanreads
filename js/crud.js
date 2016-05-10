var Crud = React.createClass({
  render: function() {
    return (
      <main>
        <ReviewsList reviews={this.state.data}/>
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
  }
});

var ReviewsList = React.createClass({
  render: function() {
    var reviewNodes = this.props.reviews.map(function(review) {
      return <Review review={review} />
    });
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
        {this.props.review.title}
      </div>
    )
  }
});

ReactDOM.render(
  <Crud />,
  document.getElementById('crud')
);
