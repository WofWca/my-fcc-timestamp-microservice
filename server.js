// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello2", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateString = req.params.date_string;
  let date;
  if (dateString === undefined) {
    date = new Date();
  } else {
    const milliseconds = Number(dateString);
    if (Number.isSafeInteger(milliseconds)) {
      date = new Date(milliseconds);
    } else {
      // This can make `date` an invalid date. Which is fine.
      date = new Date(dateString);
    }
  }
  res.json({unix: date.getTime(), "utc": date.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});