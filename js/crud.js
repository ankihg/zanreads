var url = 'http:localhost:3000';

var Crud = React.createClass({
  render: function() {
    return (
      <main>
        <PostsContainer />
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
  }
});

var PostsContainer = React.createClass({
  render: function() {
    return (
      <div>plz</div>
    )},
    componentDidMount:  function() {
      $.ajax({
        url:
      })
    }
});

ReactDOM.render(
  <Crud />,
  document.getElementById('crud')
);
