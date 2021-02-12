const path = require("path"); //core module for path handling

const express = require("express"); //returns a function

const app = express(); //creates an express application and returns it

const directoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs"); //lets express know that hbs has been setup as the view engine
//hbs is a package that allows us to use handlebars in Express

app.use(express.static(directoryPath));

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
  }); //renders the template, second argument sends dynamic content to the template in first argument
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "Here to help",
  }); //renders the template, second argument sends dynamic content to the template in first argument
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
