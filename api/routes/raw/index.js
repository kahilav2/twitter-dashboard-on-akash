const express = require('express');
const RawRouter = express.Router();

RawRouter.get('/', require('./_get'));

module.exports = RawRouter;