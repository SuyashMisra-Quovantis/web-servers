const express = require("express"); //returns a function

const app = express(); //creates an express application and returns it

app.get("", (req, res) => {
  res.send("Hello express");
});

app.get("/help", (req, res) => {
  res.send("Help Page");
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
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
