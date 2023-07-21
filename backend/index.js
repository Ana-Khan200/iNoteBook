const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;
app.use(cors());

//middle ware
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook is lisitening at http://localhost:${port}`);
});
