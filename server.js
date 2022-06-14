const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


//routes
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote });
});

app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    if (req.query.person) {
        const personQuotes = quotes.filter(author => {
            return author.person === req.query.person;
        })
        res.send({ quotes: personQuotes });
    } else {
        res.send( { quotes: quotes });
    }
});

app.post('/api/quotes', (req, res, next) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;
    if (newQuote && newPerson) {
        const newQuoteObject = { quote: newQuote, person: newPerson };
        quotes.push(newQuoteObject);
        res.send({ quote: newQuoteObject });
    } else {
        res.status(400).send();
    }
})



app.listen(PORT);