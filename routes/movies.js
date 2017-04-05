var express = require('express');
var Movie = require('./../models/Movie');
var movieController = require('./../controllers/MovieController')(Movie);

var movieRouter = express.Router();

movieRouter.route('')
    .get(movieController.get)
    .post(movieController.add)
;

movieRouter.route('/:id')
    .get(movieController.getById)
    .put(movieController.update)
    .patch(movieController.patch)
    .delete(movieController.delete)
;

module.exports = movieRouter;