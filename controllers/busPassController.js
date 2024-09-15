const db = require("../db/queries");

async function getAllIndividualTrip(req, res) {
  const indivualTrip = await db.getAllIndividualTripFromDb();
  const countTotalTrips = await db.countCartRowsFromDb();

  res.render("bus-pass", {
    indivualTrip: indivualTrip,
    cartTotalTrips: countTotalTrips[0].count,
  });
}

async function postInsertCart(req, res) {
  const { id } = req.body;
  await db.insertIntoTripsDb(id);
  res.redirect("/bus-pass");
}

module.exports = {
  getAllIndividualTrip,
  postInsertCart,
};
