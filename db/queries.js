const pool = require("./pool");

async function getAllTripsFromDb() {
  const { rows } = await pool.query(
    "SELECT cartitemid, tripname, price FROM cart JOIN triptypes ON cart.triptypeid = triptypes.triptypeid"
  );
  return rows;
}

async function getAllIndividualTripFromDb() {
  const { rows } = await pool.query("SELECT * FROM triptypes");
  return rows;
}

async function insertIntoTripsDb(id) {
  await pool.query("INSERT INTO cart (triptypeid) VALUES ($1)", [id]);
}

async function countCartRowsFromDb() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM cart");
  return rows;
}

async function deleteItemFromCart(id) {
  await pool.query("DELETE FROM cart WHERE tripid = " + id);
}

async function getTotalAmountFromDb() {
  const { rows } = await pool.query(
    "SELECT SUM(price) FROM cart JOIN triptypes ON cart.triptypeid = triptypes.triptypeid"
  );
  return rows[0].sum;
}

async function deleteRowsAndRestart() {
  await pool.query("TRUNCATE TABLE cart RESTART IDENTITY");
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
