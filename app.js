const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const path = require("path");

const uri =
  "mongodb+srv://srijit:dAY7sQy0XPzFRbJR@cluster1.i4gn6gy.mongodb.net/?retryWrites=true&w=majority";

app.use(cors({ origin: true }));
app.use(express.json());

// user authentication routes
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist links
const artistsRoute = require("./routes/artists");
app.use("/api/artists/", artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);

// If any depreciation warning add depreciation options
// mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
//   console.log("Mongodb Connected");
// });

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(4000, () => console.log("lisitening to port 4000"));
