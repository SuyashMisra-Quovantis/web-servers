const path = require("path"); //core module for path handling
const hbs = require("hbs");

const express = require("express"); //returns a function

const app = express(); //creates an express application and returns it

const directoryPath = path.join(__dirname, "../public");

const viewPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialsPath);

app.set("view engine", "hbs"); //lets express know that hbs has been setup as the view engine
//hbs is a package that allows us to use handlebars in Express

app.set("views", viewPath); //sets express to fetch hbs templates from viewPath directory

app.use(express.static(directoryPath)); //directory to load static webpages

app.get("", (req, res) => {
  res.render("index", {
    title: "Welcome to homepage",
    name: "Suyash Misra",
  }); //renders the template, second argument sends dynamic content to the template in first argument
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Suyash Misra",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "Here to help",
    name: "Suyash Misra",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is raining",
    location: "Kanpur",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
