require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

// const multer = require('multer');
// const upload = require("./middleware/multer");
// const path           = require('path')
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello World!")
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api/v1`);
});
