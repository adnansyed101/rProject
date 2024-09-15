const path = require("path");

const express = require("express");
const app = express();
const cartController = require("./controllers/cartController");
const busPassController = require("./controllers/busPassController");
const sslcommerz = require("./controllers/sslController");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/cart", cartController.getAllTrips);
app.get("/bus-pass", busPassController.getAllIndividualTrip);
app.post("/bus-pass", busPassController.postInsertCart);
app.delete("/cart/:id", cartController.deleteTrip);


//sslcommerz init
app.get("/init", sslcommerz.sslIntialize);

app.listen(PORT, function () {
  console.log("Listening to server on " + PORT);
});
