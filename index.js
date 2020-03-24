const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");
const path = require("path");
const app = express();
var cors = require("cors");

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRoutes);
app.use("/api", authRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
