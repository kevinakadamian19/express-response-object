const express = require('express');
const morgan = require('morgan');
const data = require('./playstore-data');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req,res) => {
    const { genres="", sort } = req.query;
    //Validations: if sort is present then validate; if genre is present then validate
    if(sort) {
        if(!['app', 'rating'].includes(sort)) {
            return res.status(400).send('Sort must be either App or Rank');
        }
    }
    if(genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res.status(400).send('Genres must be either Action, Strategy, Casual, Arcade, or Card.');
        }
    }
    //filter results by genre, and return as JSON object
    let results = data
        .filter(data =>
            data
            .Genres
            .toLowerCase()
            .includes(genres.toLowerCase()));
    if(sort) {
        results
          .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        }); 
    } 
    res.json(results);
})

app.listen(8000, () => {
    console.log('App is listening on port 8000');
})