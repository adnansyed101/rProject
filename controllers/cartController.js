const db = require("../db/queries");

async function getAllTrips(req, res) {
  const trips = await db.getAllTripsFromDb();
  console.log(trips);
  let total = 0;

  for (const trip of trips) {
    total = total + parseInt(trip.price);
  }

  res.render("cart", { trips: trips, total: total });
}

module.exports = {
  getAllTrips,
};
