const db = require("../db/queries");

async function getAllIndividualTrip(req, res) {
  const indivualTrip = await db.getAllIndividualTripFromDb();
  res.render("bus-pass", { indivualTrip: indivualTrip });
}

async function postInsertCart(req, res) {
  const { id } = req.body;

  db.insertIntoTripsDb(id);
  res.redirect("/bus-pass");
}

module.exports = {
  getAllIndividualTrip,
  postInsertCart,
};
