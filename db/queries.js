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

async function countCartRowsFromDb() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM trips");
  return rows;
}

async function deleteItemFromCart(id) {
  await pool.query("DELETE FROM trips WHERE tripid = " + id);
}

async function getTotalAmountFromDb() {
  const { rows } = await pool.query(
    "SELECT SUM(price) FROM trips JOIN triptypes ON trips.triptypeid = triptypes.triptypeid"
  );
  return rows[0].sum;
}

async function deleteRowsAndRestart() {
  await pool.query("TRUNCATE TABLE trips RESTART IDENTITY");
}

module.exports = {
  getAllTripsFromDb,
  getAllIndividualTripFromDb,
  insertIntoTripsDb,
  countCartRowsFromDb,
  deleteItemFromCart,
  getTotalAmountFromDb,
  deleteRowsAndRestart,
};
