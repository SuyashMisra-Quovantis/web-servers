const path = require("path"); //core module for path handling

const hbs = require("hbs");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const express = require("express"); //returns a function

const session = require("express-session");

const app = express(); //creates an express application and returns it

const directoryPath = path.join(__dirname, "../public");

const viewPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.set("view engine", "hbs"); //lets express know that hbs has been setup as the view engine
//hbs is a package that allows us to use handlebars in Express

app.set("views", viewPath); //sets express to fetch hbs templates from viewPath directory

app.use(express.static(directoryPath)); // directory to load static webpages, app.use() binds middleware to the application

app.use(cookieParser());

app.use(session({ secret: "session secret" }));

app.use(bodyParser.urlencoded({ extended: true })); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).

app.use(bodyParser.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).

const name = "Suyash Misra";

//doubt: why is this called at the starting and ending
app.use((req, res, next) => {
  console.log("Logged from middleware");
  next();
});

//middleware for specific route
app.use("/about", (req, res, next) => {
  console.log("In about route");
  next();
});

//multiple middleware functions
app.use(
  "/help",
  (req, res, next) => {
    console.log("In Help route");
    next();
  },
  (req, res, next) => {
    console.log("In help second middleware");
    next();
  }
);

/*
app.get("/", function (req, res) {
  throw new Error("BROKEN"); // Express will catch this on its own.
});
*/

/*
For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the next() function, where Express will catch and process them.

app.get('/', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
*/

/*
Starting with Express 5, route handlers and middleware that return a Promise will call next(value) automatically when they reject or throw an error. 

app.get("/weather/:id", async function (req, res, next) {
  var weather = await getWeatherById(req.params.id);
  res.send(user);
});
*/

/*
//Asynchronous errors need to be caught and passed to express for processing
app.get("/", function (req, res, next) {
  setTimeout(function () {
    try {
      throw new Error("BROKEN");
    } catch (err) {
      next(err);
    }
  }, 100);
});
*/
/*
//sessions
app.get("", (req, res, next) => {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
  next();
});
*/

//setting cookies
app.get(
  "",
  (req, res, next) => {
    res.cookie("name", "express"); //Sets name = express
    console.log("Cookies: ", req.cookies);
    next();
  },
  (req, res, next) => {
    res.render("index", {
      title: "Welcome to homepage",
      name,
    }); //renders the template, second argument sends dynamic content to the template in first argument
    next();
  },
  (req, res) => {
    // res.clearCookie("name");
    // res.send("cookie name cleared");
    console.log("Cookies: ", req.cookies);
  }
);

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
