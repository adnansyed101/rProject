const db = require("../db/queries");

async function getAllTripTypes(req, res) {
  const indivualTrip = await db.getAllTripTypesFromDb();
  const countTotalTrips = await db.countCartRowsFromDb();

  res.render("bus-pass", {
    indivualTrip: indivualTrip,
    cartTotalTrips: countTotalTrips[0].count,
  });
}

async function insertIntoCart(req, res) {
  const { id } = req.body;
  await db.insertIntoCartDb(id);
  res.redirect("/bus-pass");
}

module.exports = {
  getAllTripTypes,
  insertIntoCart,
};
