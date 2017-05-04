const express        = require('express');
const Movie          = require('../models/movie-model.js');
const router         = express.Router();

///movies get
router.get('/movies',(req, res, next)=>{
  Movie.find((err, movieList)=>{
      if(err){
        next(err);
        return;
        }
    res.render('movies/movies-list-view.ejs',{
      movies: movieList
      });
    });
  });

//movie/new get
router.get('/movies/new', (req, res, next) => {
    res.render('movies/new-movies-view.ejs');
  });
//movie/new post
router.post('/movies/new', (req, res, next)=>{
    const theMovie= new Movie({
      title: req.body.movieTitle,
      genre: req.body.movieGenre,
      plot: req.body.moviePlot
    });
    theMovie.save((err)=>{
      if(err){
        res.render('movies/new-movies-view.ejs', {
          validationErrors: theMovie.errors
        });
        return;
      }
      res.redirect('/movies');
    });
  });

///movies/:id
router.get('/movies/:id', (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId, (err, theMovie) => {
      if (err) {
      next(err);
      return;
        }
      if (!theMovie) {
        next();
        return;
        }
    res.render('movies/movies-details-view.ejs', {
      movies: theMovie
      });
    });
  });

// movies/edit get
router.get('/movies/:id/edit', (req, res, next) => {
        const moviesId = req.params.id;
        Movie.findById(moviesId, (err, theMovie) => {
            if (err) {
            next(err);
            return;
              }
        res.render('movies/edit-movies-view.ejs', {
          movies: theMovie
          });
        });
      });

// movie/edit post
router.post('/movies/:id', (req, res, next) => {
    const movieId = req.params.id;
    const movieChanges = {
      title: req.body.movieTitle,
      genre: req.body.movieGenre,
      plot: req.body.moviePlot
        };
  Movie.findByIdAndUpdate(
      movieId,
      movieChanges,
      (err, theMovie) => {
        if (err) {
          res.render('movies/edit-movies-view.ejs', {
            movies: theMovie,
            validationErrors: theMovie.errors
          });
        return;
          }
      res.redirect('/movies');
      }
    );
  });

// movie/delete post
router.post('/movies/:id/delete', (req, res, next)=>{
    const movieId = req.params.id;
    Movie.findByIdAndRemove(movieId, (err, theMovie) =>{
      if (err){
        next(err);
        return;
        }
      res.redirect('/movies');
    });
  });

///search
router.get('/search', (req, res, next)=> {
    const searchTerm = req.query.movieSearchTerm;
    if (!searchTerm){
        res.render('movies/search-view.ejs');
        return;
        }
    const searchRegex = new RegExp(searchTerm);
    Movie.find(
      {name: searchRegex},
      (err, searchResults) => {
        if(err) {
          next(err);
          return;
          }
      res.render('movies/search-view.ejs', {
        movies: searchResults
        });
      }
    );
  });


module.exports = router;
