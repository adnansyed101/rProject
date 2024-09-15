const db = require("../db/queries");

// asynchronus
async function getAllTripTypes(req, res) {
  // Gets the individual trips.
  const indivualTrip = await db.getAllTripTypesFromDb();
  // Counts the total trips in cart
  const countTotalTrips = await db.countCartRowsFromDb();

  res.render("bus-pass", {
    indivualTrip: indivualTrip,
    cartTotalTrips: countTotalTrips[0].count,
  });
}

async function insertIntoCart(req, res) {
  const id = req.body.id;
  await db.insertIntoCartDb(id);
  res.redirect("/bus-pass");
}

module.exports = {
  getAllTripTypes,
  insertIntoCart,
};
