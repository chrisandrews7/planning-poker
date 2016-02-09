import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/../client/index.html');
});

export default app;