const db = require("../db/queries");

async function getAllTrips(req, res) {
  const trips = await db.getAllTripsFromDb();
  let total = 0;
  for (const trip of trips) {
    total = total + parseInt(trip.price);
  }
  res.render("cart", { trips: trips, total: total });
}

async function deleteTrip(req, res) {
  const id = req.params.id;

  await db
    .deleteItemFromCart(id)
    .then((result) => {
      res.json({ redirect: "/cart" });
    })
    .catch((err) => console.log(err));
}

module.exports = {
  getAllTrips,
  deleteTrip
};
