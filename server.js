var express = require("express");
var cors = require("cors");

var app = express();

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:timestamp", function (req, res) {
  const timestamp = req.params.timestamp;
  let utc = new Date(timestamp).toUTCString();
  let unix = Math.floor(new Date(timestamp).getTime());

  if (utc === "Invalid Date") {
    utc = new Date(Number(timestamp)).toUTCString();
    unix = timestamp;
    if (utc === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    }
  }

  res.json({ unix, utc });
});

app.get("/api/", (req, res) => {
  const date = new Date().toUTCString();
  let utc = new Date(date).toUTCString();
  let unix = Math.floor(new Date(date).getTime());

  if (utc === "Invalid Date") {
    utc = new Date(Number(timestamp)).toUTCString();
    unix = timestamp;
  }
  res.json({ unix, utc });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App is listening on port " + port);
});
