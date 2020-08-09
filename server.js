//Install express server    
const express = require('express');

const path = require('path');

var cors = require('cors') ף

const app = express();

app.options('*', cors());

// Serve only the static files form the dist directory    
app.use(express.static(__dirname + '/dist/wheather'));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

//   if ('OPTIONS' == req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/wheather/index.html'));
});

// Start the app by listening on the default Heroku port    
app.listen(process.env.PORT || 8080);
