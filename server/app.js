const express = require("express");
const app = express();
const cors = require("cors");
const dot = require("dotenv").config();
const { connect } = require("./db/Connect");
const mentorRoutes = require("./routes/mentor.routes");
const menteeRoutes = require("./routes/mentee.routes");
const articleRoutes = require("./routes/article.routes");
const puppet = require("puppeteer");

// const {protect}= require("./middlewares/authMiddleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/mentor", mentorRoutes);
app.use("/api/mentee", menteeRoutes);
app.use("/api/article", articleRoutes);

connect()
  .then(() => {
    app.listen(process.env.PORT || 3000, async () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => console.error(error.message));
