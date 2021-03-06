const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
// Bodyparser Middleware
app.use(express.json());

// cors origin URL - Allow inbound traffic from origin
corsOptions = {
  origin: "https://personal-dashboard-mv.herokuapp.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());

// DB Config Heroku
const dbProd =
  "mongodb+srv://MikkV:MikkV@mern-stack-todo-1ufj8.mongodb.net/test?retryWrites=true&w=majority";
//DB config development
const dbDev = config.get("mongoURI");

// Connect to Mongo
if (process.env.NODE_ENV == "production") {
  mongoose
    .connect(
      "mongodb+srv://MikkV:MikkV@mern-stack-todo-1ufj8.mongodb.net/test?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
} else {
  mongoose
    .connect(dbDev, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
}
//Use Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

//Serve static assets in production
if (process.env.NODE_ENV == "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port}`));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
