'use strict';
const express = require('express');
const path = require('path');

const port = process.env.PORT;

const app = express();
// serve static assets normally
app.use(express.static('resources'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'resources', 'index.html'));
});

app.listen(port);

