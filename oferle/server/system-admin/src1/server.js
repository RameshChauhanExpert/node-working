const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send(__dirname);
});

app.get('/', function (req, res) {
  res.sendFile(path.join("D:/xampp/htdocs/react-backend/system-admin/", 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);