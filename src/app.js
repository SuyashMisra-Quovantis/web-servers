const path = require("path"); //core module for path handling

const express = require("express"); //returns a function

const app = express(); //creates an express application and returns it

const directoryPath = path.join(__dirname, "../public");

app.use(express.static(directoryPath));

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is raining",
    location: "Kanpur",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
