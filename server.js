var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static('./'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {console.log(req.method + ' request for '+req.url); next(); });

app.get('/reviews', function(req, res) {
  console.log('get reviews');
  fs.readFile(__dirname + '/data/reviews.json', (err, data) => {
    if (err) return res.status(500).json({msg:'error retrieving reviews', err:err});
    return res.status(200).json({msg:'all reviews', data:JSON.parse(data)});
  })
});

app.post('/reviews', function(req, res) {
  console.log('post a review', req.body);
  fs.readFile(__dirname + '/data/reviews.json', (err, data) => {
    if (err) return res.status(500).send(err);
    var postArr = JSON.parse(data);
    postArr.push(req.body);
    fs.writeFile(__dirname + '/data/reviews.json', JSON.stringify(postArr, null, 4), (err) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json({msg:'created review', data:req.body});
    });
  });
});

app.put('/reviews/:title', function(req, res) {
  console.log('update ');
  console.log(req.params.title);
  console.log(req.body);
  var title = req.params.title.replace(/_/g, ' ');
  fs.readFile(__dirname + '/data/reviews.json', (err, data) => {
    if (err) return res.status(500).send(err);
    var reviews = JSON.parse(data);
    reviews = reviews.map(r => (r.title == title) ?  req.body : r ); // updates all reviews with title

    fs.writeFile(__dirname + '/data/reviews.json', JSON.stringify(reviews, null, 4), (err) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json({msg:'updated review', data:req.body});
    });
  });
})

app.delete('/reviews/:title', function(req, res) {
  console.log('delete');
  var title = req.params.title.replace(/_/g, ' ');
  fs.readFile(__dirname + '/data/reviews.json', (err, data) => {
    if (err) return res.status(500).send(err);
    var reviews = JSON.parse(data);
    reviews = reviews.filter(r => r.title != title); // deletes all reviews with title

    fs.writeFile(__dirname + '/data/reviews.json', JSON.stringify(reviews, null, 4), (err) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json({msg:'review deleted'});
    });
  });
})

app.get('*.html', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
