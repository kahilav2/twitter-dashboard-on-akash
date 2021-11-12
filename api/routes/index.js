const express = require('express');
const IndexRouter = express.Router();

IndexRouter.use('/raw', require('./raw'));
IndexRouter.get('/', require('./_get'));

module.exports = IndexRouter;