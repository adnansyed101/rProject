const path = require("path");
const express = require("express");
const app = express();
const cartController = require("./controllers/cartController");
const busPassController = require("./controllers/busPassController");
const sslcommerz = require("./controllers/sslController");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // EJS -- Embedded JS; Converts Ejs files to HTML.

app.use(express.urlencoded({ extended: true })); // To get data from req.body;

const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/cart", cartController.getAllCartItems);
app.delete("/cart/:id", cartController.deleteCartItem);
app.get("/bus-pass", busPassController.getAllTripTypes);
app.post("/bus-pass", busPassController.insertIntoCart);
app.post("/success", sslcommerz.successRoute);

//sslcommerz init
app.get("/init", sslcommerz.sslIntialize);

app.listen(PORT, function () {
  console.log("Listening to server on " + PORT);
});
