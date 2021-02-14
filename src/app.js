const path = require("path"); //core module for path handling
const hbs = require("hbs");
const bodyParser = require("body-parser");

const express = require("express"); //returns a function

const app = express(); //creates an express application and returns it

const directoryPath = path.join(__dirname, "../public");

const viewPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.set("view engine", "hbs"); //lets express know that hbs has been setup as the view engine
//hbs is a package that allows us to use handlebars in Express

app.set("views", viewPath); //sets express to fetch hbs templates from viewPath directory

app.use(express.static(directoryPath)); // directory to load static webpages, app.use() binds middleware to the application

app.use(bodyParser.urlencoded({ extended: true })); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).

app.use(bodyParser.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).

const name = "Suyash Misra";

app.get("", (req, res) => {
  res.render("index", {
    title: "Welcome to homepage",
    name,
  }); //renders the template, second argument sends dynamic content to the template in first argument
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "Here to help",
    name,
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "Weather",
    name,
  });
  /*
  res.send({
    forecast: "It is raining",
    location: "Kanpur",
  });*/
});
app.post("/weather", (req, res) => {
  // console.log("Helllooooo");
  // console.log(req.body.searchId);
  const param = req.body.searchId;

  res.redirect(`/weather/${param}`);
});

app.get("/weather/:id", (req, res) => {
  res.render("weatherIdSpecific", {
    title: "Weather Specific",
    name,
    id: req.params.id,
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Help article not found!",
    name,
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Page not found",
    name,
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
