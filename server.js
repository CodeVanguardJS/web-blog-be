const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.APP_PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/hello", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`app running in port ${port}`);
});
