const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(CORS());

let movies = [
  {
    id: 0,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    metascore: 100,
    stars: ["Marlon Brando", "Al Pacino", "Robert Duvall"]
  },
  {
    id: 1,
    title: "Star Wars",
    director: "George Lucas",
    metascore: 92,
    stars: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"]
  },
  {
    id: 2,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    director: "Peter Jackson",
    metascore: 92,
    stars: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"]
  },
  {
    id: 3,
    title: "Terminator 2: Judgement Day",
    director: "James Cameron",
    metascore: 94,
    stars: ["Arnold Schwarzenegger", "Edward Furlong", "Linda Hamilton"]
  },
  {
    id: 4,
    title: "Dumb and Dumber",
    director: "The Farely Brothers",
    metascore: 76,
    stars: ["Jim Carrey", "Jeff Daniels", "Lauren Holly"]
  },
  {
    id: 5,
    title: "Tombstone",
    director: "George P. Cosmatos",
    metascore: 89,
    stars: ["Kurt Russell", "Bill Paxton", "Sam Elliot"]
  }
];

let movieId = movies.length;

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.filter(movie => `${movie.id}` === req.params.id)[0];
  res.status(200).json(movie);
});

app.post("/api/movies", (req, res) => {
  if (req.body.title !== undefined) {
    const newMovie = req.body;
    newMovie["id"] = movieId;
    movies.push(newMovie);
  }
  ++movieId;
  res.status(201).json(movies);
});

app.put("/api/movies/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the movie id");
  if (
    req.body.id === undefined ||
    !req.body.title ||
    !req.body.director ||
    !req.body.metascore ||
    !req.body.stars
  ) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  console.log(movies, "movies")
  movies = movies.map(movie => {
    console.log(`${movie.id}`, "movie.id", req.params.id, "req params id")
    if (`${movie.id}` === req.params.id) {
      let modifiedMovie = {
        id: movie.id,
        title: req.body.title,
        metascore: req.body.metascore,
        director: req.body.director,
        stars: req.body.stars
      }
      console.log("in here?")
      return modifiedMovie;
    }
    return movie;
  });
  console.log(movies, "movies")
  res.status(200).send(movies);
});

app.delete("/api/movies/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the movie id");
  movies = movies.filter(movie => `${movie.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

app.get("/", function (req, res) {
  res.send("App is working 👍");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
