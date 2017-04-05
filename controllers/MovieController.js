var MovieController = function(Movie) {
    var get  = function(req, res){
        Movie.find(function(error, movies){
            if(error){
                res.status(500);
                res.send("Internal server error");
            } else {
                res.status(200);
                res.send(movies)
            }
        });
    };

    var add = function(req, res) {

        var movie = new Movie(req.body);
        movie.save(function(err){
           if(err){
               res.status(500);
               res.send("Internal server error");
           } else {
               res.status(201);
               res.send(movie);
           }
        });

    }

    var getById = function(req, res) {
        Movie.findById(req.params.id, function(error, movie){
           if(error){
               res.status(404);
               res.send({error: "No record found"});
           } else {
               res.status(200);
               res.send(movie);
           }
        });
    }

    var update = function(req, res) {
        Movie.findById(req.params.id, function(error, movie){
            if(error){
                res.status(404);
                res.send("No record found");
            } else {
                movie.title = req.body.title;
                movie.rating = req.body.rating;
                movie.isReleased = req.body.isReleased;

                movie.update(function(error){
                    if(!error){
                        res.status(400);
                        res.send("Bad request");
                    }else {
                        res.status(200);
                        res.send(movie);
                    }
                });
            }
        });
    }

    var patch = function(req, res) {
        Movie.findById(req.params.id, function(error, movie){
            if(error){
                res.status(404);
                res.send("No record found");
            } else {

                if(req.body._id){
                    delete req.body._id;
                }

                for( var p in req.body) {
                    movie[p] = req.body[p];
                }

                movie.save(function(error){
                   if(!error){
                       res.status(200);
                       res.send(movie);
                   } else {
                       res.status(400);
                       res.send({"error" : "Bad request"});
                   }
                });
            }
        });
    }

    var remove = function(req, res){
        Movie.findById(req.params.id, function(error, movie){
            if(error){
                res.status(404);
                res.send("No record found");
            } else if(movie) {
                movie.remove(function(error){
                    if(!error){
                        res.status(204);
                    } else {
                        res.status(500);
                        res.send("Internal server error. Please try after some time");
                    }
                });
            }
        });
    }
    
    return {
        get: get,
        add: add,
        getById: getById,
        update: update,
        patch: patch, 
        delete: remove
    }
}

module.exports = MovieController;