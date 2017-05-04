const mongoose      = require('mongoose');

mongoose.connect('mongodb://localhost/mongoose-movies');

const Celebrity     = require('../models/celebrity-model.js');
const celebrities   = [
        {
          name: 'Colby Allen',
          occupation: 'Teacher',
          catchPhrase: 'Cool Cool'
        },
        {
          name: 'Barack Obama',
          occupation: 'President',
          catchPhrase: 'yeaaa'
        },
        {
          name: 'Kim Kardashian',
          occupation: 'Public Figure',
          catchPhrase: 'Does this make me look fat?'
        }
      ];

Celebrity.create(celebrities, (err, celebrityDocs)=> {
  if(err){
    throw err;
  }
  celebrityDocs.forEach((oneCelebrity)=>{
    console.log(`CELEBRITY: ${oneCelebrity.name} -> ${oneCelebrity.catchPhrase} `);
  });
});

const Movie         = require('../models/movie-model.js');
const movies   = [
        {
          title: 'Malcolm X',
          genre: 'Real Shit',
          plot: 'The story of one of the greatest born men'
        },
        {
          title: 'Love & Basketball',
          genre: 'Romance',
          plot: 'The story of young love.'
        },
        {
          title: 'Brown Sugar',
          genre: 'Romance',
          plot: 'Beatiful story of chocolate love'
        },
      ];

Movie.create(movies, (err, movieDocs)=> {
  if(err){
    throw err;
  }
  movieDocs.forEach((oneMovie)=>{
    console.log(`Movie: ${oneMovie.title} -> ${oneMovie.genre} `);
  });
});
