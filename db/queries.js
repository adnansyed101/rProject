const pool = require("./pool");

async function getAllTripsFromDb() {
  const { rows } = await pool.query(
    "SELECT tripid, tripname,price FROM trips JOIN triptypes ON trips.triptypeid = triptypes.triptypeid"
  );

  return rows;
}

module.exports = {
    getAllTripsFromDb,
};
