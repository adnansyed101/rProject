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

app.get("/cart", cartController.getAllCartItems);
app.get("/bus-pass", busPassController.getAllTripTypes);
app.post("/bus-pass", busPassController.insertIntoCart);
app.delete("/cart/:id", cartController.deleteCartItem);
app.post("/success", sslcommerz.successRoute);

//sslcommerz init
app.get("/init", sslcommerz.sslIntialize);

app.listen(PORT, function () {
  console.log("Listening to server on " + PORT);
});
