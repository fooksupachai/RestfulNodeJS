const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const routes = require('./routes');
const { port } = require('./config');

const test = () => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(routes);
    app.listen(port, async () => {
        console.log(`Rest server is listening on port ${port}`);
    });
}

module.exports = test; 
