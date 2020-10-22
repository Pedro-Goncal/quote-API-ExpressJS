const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res) => {
  let returnedQuotes = getRandomElement(quotes);
  let randomQuote = { quote: returnedQuotes };
  res.status(200).send(randomQuote);
});

app.get("/api/quotes", (req, res) => {
  let person = req.query.person;
  if (person) {
    let newArray = quotes.filter((quote) => quote.person === person);

    res.status(200).send({ quotes: newArray });
  } else {
    res.status(200).send({ quotes: quotes });
  }
});

app.post("/api/quotes", (req, res) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person,
  };
  if (newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => console.log(`Server Listening on port: ${PORT}`));
