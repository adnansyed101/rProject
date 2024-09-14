const pool = require("./pool");

async function getAllTripsFromDb() {
  const { rows } = await pool.query(
    "SELECT tripid, tripname,price FROM trips JOIN triptypes ON trips.triptypeid = triptypes.triptypeid"
  );

  return rows;
}

async function getAllIndividualTripFromDb() {
  const { rows } = await pool.query("SELECT * FROM triptypes");

  return rows;
}

async function insertIntoTripsDb(id) {
  await pool.query("INSERT INTO trips (triptypeid) VALUES ($1)", [id]);
}

module.exports = {
  getAllTripsFromDb,
  getAllIndividualTripFromDb,
  insertIntoTripsDb,
};
