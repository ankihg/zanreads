var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express(),
  mysql = require('mysql'),
  connection = mysql.createConnection(process.env.ZAN_JAWSDB_URL);

var bodyParser = require('body-parser');
var fs = require('fs');

function auth(req, res, next) {
  if (req.headers.authorization === process.env.ZANSECRET) return next();
  console.log('denied');
  return res.status(401).json({msg:'unauthorized', data:'plz leave'});
}

app.use(express.static('./'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {console.log(req.method + ' request for '+req.url); next(); });

app.get('/reviews', function(req, res) {
  console.log('get reviews');
  // fs.readFile(__dirname + '/data/reviews.json', (err, data) => {
  //   if (err) return res.status(500).json({msg:'error retrieving reviews', err:err});
  //   return res.status(200).json({msg:'all reviews', data:JSON.parse(data)});
  // })

  connection.query(
    'SELECT * FROM reviews',
    function(err, rows, fields) {
      if (err) console.log(err);
      return res.status(200).json({msg:'all reviews', data:rows});
    }
  )
});

app.post('/reviews', auth, function(req, res) {
  // console.log('post a review', req.body);
  // fs.readFile(__dirname + '/data/reviews.json', (err, data) => {
  //   if (err) return res.status(500).send(err);
  //   var postArr = JSON.parse(data);
  //   postArr.push(req.body);
  //   fs.writeFile(__dirname + '/data/reviews.json', JSON.stringify(postArr, null, 4), (err) => {
  //     if (err) return res.status(500).send(err);
  //     return res.status(200).json({msg:'created review', data:req.body});
  //   });
  // });


  // console.log(`INSERT INTO reviews (title, author, imgSrc, body) VALUES (${req.body.title}, ${req.body.author}, ${req.body.imgSrc}, ${req.body.body})`);

  connection.query(
    `CREATE TABLE IF NOT EXISTS reviews (id MEDIUMINT NOT NULL AUTO_INCREMENT, title VARCHAR(30), author VARCHAR(30), imgSrc VARCHAR(100), body VARCHAR(65535), PRIMARY KEY (id))`,
    function(err, rows, fields) {
      if (err) console.log(err);

      connection.query(
        `INSERT INTO reviews SET ?`, req.body,
        function(err, rows, fields) {
          if (err) console.log(err);
          console.log(rows);
        }
      );

    });

});

app.put('/reviews/:title', auth, function(req, res) {
  console.log('update ');
  console.log(req.params.title);
  console.log(req.body);
  req.params.title = req.params.title.replace(/_/g, ' ');
  // fs.readFile(__dirname + '/data/reviews.json', (err, data) => {
  //   if (err) return res.status(500).send(err);
  //   var reviews = JSON.parse(data);
  //   reviews = reviews.map(r => (r.title == title) ?  req.body : r ); // updates all reviews with title
  //
  //   fs.writeFile(__dirname + '/data/reviews.json', JSON.stringify(reviews, null, 4), (err) => {
  //     if (err) return res.status(500).send(err);
  //     return res.status(200).json({msg:'updated review', data:req.body});
  //   });
  // });

  connection.query(
    'UPDATE reviews SET title=?, author=?, imgSrc=?, body=? WHERE title=?',
    [req.body.title, req.body.author, req.body.imgSrc, req.body.body, req.params.title],
    function(err, rows, fields) {
      if (err) console.log(err);
      return res.status(200).json({msg:'updated review'});
    }
  )
})

app.delete('/reviews/:title', auth, function(req, res) {
  console.log('delete');
  req.params.title = req.params.title.replace(/_/g, ' ');
  // fs.readFile(__dirname + '/data/reviews.json', (err, data) => {
  //   if (err) return res.status(500).send(err);
  //   var reviews = JSON.parse(data);
  //   reviews = reviews.filter(r => r.title != title); // deletes all reviews with title
  //
  //   fs.writeFile(__dirname + '/data/reviews.json', JSON.stringify(reviews, null, 4), (err) => {
  //     if (err) return res.status(500).send(err);
  //     return res.status(200).json({msg:'review deleted'});
  //   });
  // });

  connection.query(
    'DELETE FROM reviews WHERE title=?',
    req.params.title,
    function(err, rows, fields) {
      if (err) console.log(err);
      if (rows.affectedRows < 1) return res.status(400).json({msg:'no reviews deleted', err: new Error('review not found')});
      if (rows.affectedRows == 1) return res.status(200).json({msg:'review deleted'});
      if (rows.affectedRows > 1) return res.status(200).json({msg:'multiple reviews deleted'});
    }
  )

})

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
